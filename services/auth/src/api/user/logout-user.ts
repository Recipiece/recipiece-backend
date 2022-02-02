import { NextFunction, Response } from 'express';
import { AuthRequest, IUser, Session } from 'recipiece-common';

export async function logoutUser(req: AuthRequest, res: Response, next: NextFunction) {
  const { token, user } = req;
  try {
    await logout(token, user);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function logout(token: string, user: Partial<IUser>) {
  const session = Session.deserialize(token);
  await session.delete();
}
