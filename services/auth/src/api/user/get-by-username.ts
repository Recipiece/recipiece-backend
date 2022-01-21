import { DatabaseConstants, DbI, User } from 'recipiece-common';

export async function getUserByUsername(username: string): Promise<User | undefined> {
  const dbEntity = await DbI.queryEntity(DatabaseConstants.collections.users, {
    email: username,
  });
  console.log(dbEntity);
  if (dbEntity.data.length > 0) {
    return new User(dbEntity.data[0]);
  } else {
    return undefined;
  }
}
