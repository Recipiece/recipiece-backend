import { randomUUID } from 'crypto';
import { BadRequestError, ConflictError, StagedUser, Utils } from 'recipiece-common';
import { encryptPassword } from '../../encrypt/encrypt-password';
import { getUserByUsername } from '../user/get-by-username';

export async function stageUser(email: string, password: string): Promise<StagedUser> {
  if (Utils.nou(email)) {
    throw new BadRequestError('email', email);
  }
  if (Utils.nou(password)) {
    throw new BadRequestError('password', password);
  }

  // check that the email doesn't exist already on a user
  const existingUser = await getUserByUsername(email);
  if (!Utils.nou(existingUser)) {
    throw new ConflictError();
  }

  const pwBundle = await encryptPassword(password);
  let stagedUser = new StagedUser({
    email: email,
    password: pwBundle.password,
    nonce: pwBundle.nonce,
    salt: pwBundle.salt,
    token: randomUUID(),
  });

  // save the staged user
  try {
    return new StagedUser(await stagedUser.save());
  } catch (keyErr) {
    // console.log(keyErr);
    throw new ConflictError();
  }
}

