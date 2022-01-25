import * as E from 'express';
import { ForbiddenError, IUser, NotFoundError, Session, Utils } from 'recipiece-common';
import { comparePasswords } from '../../encrypt/compare-passwords';
import { getUserByUsername } from './get-by-username';

export interface LoggedInBundle {
  token: string;
  user: Partial<IUser>;
}

export async function loginUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { username, password } = req.body;
  const userLookup = await getUserByUsername(username);

  if (!Utils.nou(userLookup)) {
    const expectedPassword = userLookup.password;
    const expectedSalt = userLookup.salt;
    const expectedNonce = userLookup.nonce;
    if (comparePasswords(password, expectedPassword, expectedSalt, expectedNonce)) {
      let session = new Session({
        owner: userLookup._id,
      });
      await session.save();
      res.status(200).send({
        token: session.serialize(),
        user: userLookup.asModel(),
      });
    } else {
      next(new ForbiddenError());
    }
  } else {
    next(new NotFoundError(username));
  }
}
