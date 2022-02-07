import { NextFunction, Response } from 'express';
import { AuthRequest, SessionModel, UnauthorizedError, User, UserModel } from 'recipiece-common';
import { comparePasswords, encryptPassword } from '../../encrypt';

export async function resetKnownPassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await resetPassword(req);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function resetPassword(req: AuthRequest): Promise<User> {
  const { old, desired } = req.body;
  const user = req.user;
  const { salt, nonce, password } = user;
  if (await comparePasswords(old, password, salt, nonce)) {
    const newPwBundle = await encryptPassword(desired);
    user.nonce = newPwBundle.nonce;
    user.password = newPwBundle.password;
    user.salt = newPwBundle.salt;

    await SessionModel.deleteMany({ owner: user.id }).exec();

    return await new UserModel(user).save();
  } else {
    throw new UnauthorizedError();
  }
}
