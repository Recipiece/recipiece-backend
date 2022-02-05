import * as E from 'express';
import { NotFoundError, StagedUserModel, UserModel, Utils } from 'recipiece-common';

export async function migrateStagedUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { token } = req.body;
  try {
    await migrate(token);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function migrate(token: string) {
  const stagedUser = await StagedUserModel.findOne({
    token: token,
  });

  if (Utils.nou(stagedUser)) {
    throw new NotFoundError(token);
  }
  const user = new UserModel({
    username: stagedUser.username,
    email: stagedUser.email,
    password: stagedUser.password,
    salt: stagedUser.salt,
    nonce: stagedUser.nonce,
    preferences: {},
    permissions: [],
  });
  await user.save();
  await stagedUser.delete();
}
