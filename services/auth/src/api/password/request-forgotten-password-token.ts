import { randomUUID } from 'crypto';
import { NextFunction, Response } from 'express';
import { AuthRequest, EmailI, ForgotPasswordTokenModel, NotFoundError, UserModel, Utils } from 'recipiece-common';

export async function requestForgotPasswordToken(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await forgotPassword(req);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function forgotPassword(req: AuthRequest) {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (Utils.nou(user)) {
    throw new NotFoundError(email);
  }
  const token = randomUUID();
  const forgotPasswordToken = new ForgotPasswordTokenModel({
    token: token,
    owner: user.id,
  });
  await forgotPasswordToken.save();

  await EmailI.sendForgotPasswordEmail(email, forgotPasswordToken.token);

  return forgotPasswordToken;
}
