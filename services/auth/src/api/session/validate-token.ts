import * as E from 'express';
import { ForbiddenError, IUser, Session, UnauthorizedError, User, UserModel, Utils } from 'recipiece-common';

export async function validateToken(req: E.Request, res: E.Response, next: E.NextFunction) {
  const token = req.body.token;
  const permissions = req.body.permissions;
  try {
    const user = await runValidation(token, permissions);
    res.status(200).send(user);
  } catch {
    next(new ForbiddenError());
  }
}

export async function runValidation(token: string, permissions: string[]): Promise<IUser> {
  const session = await Session.deserialize(token);
  const user = await UserModel.findById(session.owner);
  if (Utils.nou(user)) {
    throw new UnauthorizedError();
  }
  return user.toJSON();
}
