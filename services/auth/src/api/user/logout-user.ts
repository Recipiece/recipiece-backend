import * as E from 'express';
import { NotFoundError, Session, Utils } from 'recipiece-common';

export async function logoutUser(req: E.Request, res: E.Response, next: E.NextFunction) {
  // @ts-ignore
  const sessionToken = req.token;
  const session = Session.deserialize(sessionToken);
  if(Utils.nou(session)) {
    next(new NotFoundError('session'));
  } else {
    await(session.delete());
    res.status(200).send();
  }
}
