import { randomUUID } from 'crypto';
import * as E from 'express';
import { BadRequestError, ConflictError, EmailI, StagedUserModel, Utils } from 'recipiece-common';
import { encryptPassword } from '../../encrypt/encrypt-password';
import { getUserByEmail, getUserByUsername } from '../user/get-user';

export async function stageUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  try {
    const { username, email, password } = req.body;
    const staged = await stage(username, email, password);
    res.status(201).send(staged.asJson());
  } catch (e) {
    next(e);
  }
}

async function stage(username: string, email: string, password: string) {
  if (Utils.nou(username)) {
    throw new BadRequestError('username', username);
  }
  if (Utils.nou(email)) {
    throw new BadRequestError('email', username);
  }
  if (Utils.nou(password)) {
    throw new BadRequestError('password', password);
  }

  // check that the email doesn't exist already on a user
  const fromUsername = await getUserByUsername(username);
  if (!Utils.nou(fromUsername)) {
    throw new ConflictError();
  }

  const fromEmail = await getUserByEmail(email);
  if (!Utils.nou(fromEmail)) {
    throw new ConflictError();
  }

  const pwBundle = await encryptPassword(password);
  const stagedUser = new StagedUserModel({
    email: email,
    username: username,
    password: pwBundle.password,
    nonce: pwBundle.nonce,
    salt: pwBundle.salt,
    token: randomUUID(),
  });

  // save the staged user
  try {
    await stagedUser.save();
    await EmailI.sendCreateAccountEmail(email, stagedUser.token);
    return stagedUser;
  } catch (keyErr) {
    throw new ConflictError();
  }
}
