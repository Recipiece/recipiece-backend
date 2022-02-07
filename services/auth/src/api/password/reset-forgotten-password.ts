import { NextFunction, Response } from 'express';
import {
  AuthRequest,
  ForgotPasswordTokenModel,
  SessionModel,
  UnauthorizedError,
  User,
  UserModel,
  Utils
} from 'recipiece-common';
import { encryptPassword } from '../../encrypt';

export async function resetForgottenPassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await resetPassword(req);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function resetPassword(req: AuthRequest): Promise<User> {
  const { token, email, desired } = req.body;
  const user: User = await UserModel.findOne({ email });
  if (Utils.nou(user)) {
    throw new UnauthorizedError();
  }
  const forgotPasswordToken = await ForgotPasswordTokenModel.findOne({
    token: token,
    owner: user.id,
  });
  if (Utils.nou(forgotPasswordToken)) {
    throw new UnauthorizedError();
  }
  const newPwBundle = await encryptPassword(desired);
  user.nonce = newPwBundle.nonce;
  user.password = newPwBundle.password;
  user.salt = newPwBundle.salt;

  await ForgotPasswordTokenModel.deleteMany({ owner: user.id });
  await SessionModel.deleteMany({ owner: user.id });

  return await new UserModel(user).save();
}
