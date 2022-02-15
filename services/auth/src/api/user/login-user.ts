import * as E from 'express';
import { IUser, NotFoundError, SessionModel, UnauthorizedError, UserModel, Utils } from 'recipiece-common';
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
  const user = await UserModel.findOne({
    $or: [{ email: name }, { username: name }],
  });

  if (!Utils.nou(user)) {
    const expectedPassword = user.password;
    const expectedSalt = user.salt;
    const expectedNonce = user.nonce;
    const passwordsMatch = await comparePasswords(password, expectedPassword, expectedSalt, expectedNonce);
    if (passwordsMatch) {
      const session = new SessionModel({
        owner: user._id,
      });
      await session.save();
      return {
        token: session.serialize(),
        user: user.asJson(),
      };
    } else {
      throw new UnauthorizedError();
    }
  } else {
    throw new NotFoundError(name);
  }
}
