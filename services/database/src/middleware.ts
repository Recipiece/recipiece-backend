import * as Express from 'express';
import { MongoServerError } from 'mongodb';
import { ConflictError } from 'recipiece-common';

const CODE_ERR_MAP: { [mongoCode: string | number]: typeof Error } = {
  // @ts-ignore
  '11000': ConflictError,
};

export function rcpMongoErrorHandler(
  err: Error,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  let nextError = err;
  if (err instanceof MongoServerError) {
    const rcpError = CODE_ERR_MAP[err.code];
    if (!!rcpError) {
      nextError = new rcpError();
    }
  }
  next(nextError);
}
