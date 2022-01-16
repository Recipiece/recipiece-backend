import { comparePasswords } from 'encrypt/compare-passwords';
import { Session } from 'model/session/session';
import { IUser } from 'model/user/user.i';
import { ForbiddenError, NotFoundError, Utils } from 'recipiece-common';
import { getUserByUsername } from './get-by-username';

export interface LoggedInBundle {
  token: string;
  user: Partial<IUser>;
}

export async function loginUser(username: string, password: string): Promise<LoggedInBundle> {
  const userLookup = await getUserByUsername(username);
  if (!Utils.nou(userLookup)) {
    const expectedPassword = userLookup.password;
    const expectedSalt = userLookup.salt;
    const expectedNonce = userLookup.nonce;
    if (comparePasswords(password, expectedPassword, expectedSalt, expectedNonce)) {
      let session = new Session({
        owner: userLookup.id,
      });
      await session.save();
      return {
        token: session.serialize(),
        user: userLookup.asModel(),
      };
    } else {
      throw new ForbiddenError();
    }
  } else {
    throw new NotFoundError(username);
  }
}