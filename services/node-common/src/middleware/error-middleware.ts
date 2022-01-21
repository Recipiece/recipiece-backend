import * as Express from 'express';
import { RecipieceError } from '../error/recipiece-error';

export function rcpErrorMiddleware(err: Error, _: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (err instanceof RecipieceError) {
    res.status(err.errorCode).send(err.toJson());
  } else {
    next(err);
  }
}
