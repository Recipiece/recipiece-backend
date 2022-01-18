import { RecipieceError } from '../error/recipiece-error';
import * as Express from 'express';

export function rcpErrorMiddleware(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  try {
    next();
  } catch (e) {
    console.error(e);
    if (e instanceof RecipieceError) {
      res.status(e.errorCode).send(e.toJson());
    } else {
      res.status(500).send({
        message: e.message || 'Unknown Error',
      });
    }
  }
}
