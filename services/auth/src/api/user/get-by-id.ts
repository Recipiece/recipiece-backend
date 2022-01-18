import { DatabaseConstants, DbI, User, Utils } from 'recipiece-common';

export async function getUserById(id: string): Promise<User> {
  const userI = await DbI.getEntityById(DatabaseConstants.collections.users, id);
  if (!Utils.nou(userI)) {
    return new User(userI);
  }
}
