import * as E from 'express';
import { ForbiddenError, Session } from 'recipiece-common';
import { getUserById } from '../user';

export async function validateToken(req: E.Request, res: E.Response, next: E.NextFunction) {
  const token = req.body.token;
  try {
    const session = Session.deserialize(token);
    const user = await getUserById(session.owner);
    res.status(200).send(user.asModel());
  } catch {
    next(new ForbiddenError());
  }
}
