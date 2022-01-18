import { DatabaseConstants, DbI, User } from 'recipiece-common';

export async function getUserByUsername(username: string): Promise<User | undefined> {
  try {
    const dbEntity = await DbI.queryEntity(DatabaseConstants.collections.users, {
      email: username,
    });
    return new User(dbEntity);
  } catch {
    return undefined;
  }
}
