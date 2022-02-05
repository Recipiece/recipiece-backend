import { NextFunction, Request, Response } from 'express';
import { connect } from '../model';

export async function dbConnectMiddleware(req: Request, res: Response, next: NextFunction) {
  await connect();
  next();
}
