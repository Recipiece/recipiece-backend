import * as E from 'express';
import { ForbiddenError, NotFoundError, Session, UnauthorizedError, Utils } from 'recipiece-common';

export async function logoutUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  // @ts-ignore
  const { token, user } = req;
  try {
    const session = Session.deserialize(token);
    if (session.owner !== user._id) {
      next(new UnauthorizedError());
    } else {
      await session.delete();
      res.status(200).send();
    }
  } catch (e) {
    next(e);
  }
}
