import { NextFunction, Response } from 'express';
import { AuthRequest, IUser, Session, SessionModel } from 'recipiece-common';

export async function logoutUser(req: AuthRequest, res: Response, next: NextFunction) {
  const { session } = req;
  try {
    await SessionModel.findByIdAndDelete(session.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function logout(token: string, user: Partial<IUser>) {
  const session = await Session.deserialize(token);
  await session.delete();
}
