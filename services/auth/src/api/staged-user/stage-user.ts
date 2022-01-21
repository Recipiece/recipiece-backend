import { randomUUID } from 'crypto';
import { BadRequestError, ConflictError, StagedUser, Utils } from 'recipiece-common';
import { encryptPassword } from '../../encrypt/encrypt-password';
import { getUserByUsername } from '../user/get-by-username';
import * as E from 'express';

export async function stageUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { username, password } = req.body;
  if (Utils.nou(username)) {
    next(new BadRequestError('username', username));
  }
  if (Utils.nou(password)) {
    next(new BadRequestError('password', password));
  }

  // check that the email doesn't exist already on a user
  const existingUser = await getUserByUsername(username);
  if (!Utils.nou(existingUser)) {
    next(new ConflictError());
  }

  const pwBundle = await encryptPassword(password);
  let stagedUser = new StagedUser({
    email: username,
    password: pwBundle.password,
    nonce: pwBundle.nonce,
    salt: pwBundle.salt,
    token: randomUUID(),
  });

  // save the staged user
  try {
    await stagedUser.save();
    res.status(201).send(stagedUser.asModel());
  } catch (keyErr) {
    next(new ConflictError());
  }
}
