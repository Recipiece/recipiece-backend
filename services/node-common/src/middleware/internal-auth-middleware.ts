import * as Express from 'express';
import { Environment } from '../environment';
import { ForbiddenError } from '../error';

export function rcpInternalAuthMiddleware(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const expectedToken = Environment.INTERNAL_USER_TOKEN;
  const authHeader = req.headers['authorization'];
  if (authHeader.replace('Bearer', '').trim() !== expectedToken) {
    throw new ForbiddenError();
  } else {
    next();
  }
}
