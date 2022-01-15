import { BadRequestError } from '@common/error';
import { ConflictError } from '@common/error/conflict-error';
import { nou } from '@common/utils';
import { encryptPassword } from '../../encrypt/encrypt-password';
import { StagedUser } from '../../model/staged-user/staged-user';
import { randomUUID } from 'crypto';
import { getUserByUsername } from '../user/get-by-username';

export async function stageUser(email: string, password: string): Promise<StagedUser> {
  if (nou(email)) {
    throw new BadRequestError('email', email);
  }
  if (nou(password)) {
    throw new BadRequestError('password', password);
  }

  // check that the email doesn't exist already on a user
  const existingUser = await getUserByUsername(email);
  if(!nou(existingUser)) {
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
    throw new ConflictError();
  }
}
