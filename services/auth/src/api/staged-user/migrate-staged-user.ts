import * as E from 'express';
import { DatabaseConstants, DbI, IStagedUser, IUser, NotFoundError, User, UserCounts, Utils } from 'recipiece-common';

export async function migrateStagedUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { token } = req.params;
  const dbResponse = await DbI.queryEntity<IStagedUser>(DatabaseConstants.collections.stagedUsers, {
    token: token,
  });
  const stagedUser = dbResponse.data[0];

  if (Utils.nou(stagedUser)) {
    next(new NotFoundError(token));
  }
  const user = new User({
    email: stagedUser.email,
    password: stagedUser.password,
    salt: stagedUser.salt,
    nonce: stagedUser.nonce,
    preferences: {},
    permissions: [],
  });
  const createdUser = await user.save();
  const userCounts = new UserCounts({ owner: createdUser._id });
  await userCounts.save();
  res.status(204).send();
}
