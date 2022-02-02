import * as E from 'express';
import {
  DatabaseConstants,
  DbI, IUser,
  NotFoundError,
  Session,
  UnauthorizedError,
  User
} from 'recipiece-common';
import { comparePasswords } from '../../encrypt/compare-passwords';

export interface LoggedInBundle {
  token: string;
  user: Partial<IUser>;
}

export async function loginUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { name, password } = req.body;
  try {
    const bundle = await login(name, password);
    res.status(200).send(bundle);
  } catch (e) {
    next(e);
  }
}

async function login(name: string, password: string): Promise<LoggedInBundle> {
  const userQuery = await DbI.queryEntity<IUser>(DatabaseConstants.collections.users, {
    $or: [{ email: name }, { username: name }],
  });

  if (userQuery.data.length > 0) {
    const userLookup = new User(userQuery.data[0]);
    const expectedPassword = userLookup.password;
    const expectedSalt = userLookup.salt;
    const expectedNonce = userLookup.nonce;
    const passwordsMatch = await comparePasswords(password, expectedPassword, expectedSalt, expectedNonce);
    if (passwordsMatch) {
      let session = new Session({
        owner: userLookup._id,
      });
      await session.save();
      return {
        token: session.serialize(),
        user: userLookup.asJson(),
      };
    } else {
      throw new UnauthorizedError();
    }
  } else {
    throw new NotFoundError(name);
  }
}
