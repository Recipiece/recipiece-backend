import { DatabaseConstants, DbI, NotFoundError, Utils } from 'recipiece-common';
import { IStagedUser } from '../../model/staged-user/staged-user.i';
import { UserCounts } from '../../model/user-counts/user-counts';
import { User } from '../../model/user/user';
import { IUser } from '../../model/user/user.i';

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
  const userCounts = new UserCounts({ owner: createdUser.id });
  await userCounts.save();
  return createdUser;
}
