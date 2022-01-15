import { DatabaseConstants } from '@common/constants';
import { DbI } from '@common/interop';
import { User } from '../../model/user/user';

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
