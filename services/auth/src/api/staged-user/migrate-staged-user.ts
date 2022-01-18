import { DatabaseConstants, DbI, IStagedUser, IUser, NotFoundError, User, UserCounts, Utils } from 'recipiece-common';

export async function migrateStagedUser(token: string): Promise<Partial<IUser>> {
  const stagedUser = await DbI.queryEntity<IStagedUser>(DatabaseConstants.collections.stagedUsers, {
    token: token,
  });
  if (Utils.nou(stagedUser)) {
    throw new NotFoundError(token);
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
  return createdUser;
}
