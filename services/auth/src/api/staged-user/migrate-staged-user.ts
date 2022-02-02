import * as E from 'express';
import { DatabaseConstants, DbI, IStagedUser, NotFoundError, StagedUser, User, Utils } from 'recipiece-common';

export async function migrateStagedUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { token } = req.body;
  try {
    await migrate(token);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function migrate(token: string): Promise<User> {
  const dbResponse = await DbI.queryEntity<IStagedUser>(DatabaseConstants.collections.stagedUsers, {
    token: token,
  });

  if (dbResponse.data.length === 0) {
    throw new NotFoundError(token);
  }
  const stagedUser = new StagedUser(dbResponse.data[0]);
  const user = new User({
    username: stagedUser.username,
    email: stagedUser.email,
    password: stagedUser.password,
    salt: stagedUser.salt,
    nonce: stagedUser.nonce,
    preferences: {},
    permissions: [],
  });
  await stagedUser.delete();
  return await user.save();
}
