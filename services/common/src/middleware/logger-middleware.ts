import * as Express from 'express';

export function rcpLoggerMiddleware(req: Express.Request, _: Express.Response, next: Express.NextFunction) {
  console.log(`[${new Date().toLocaleString()}]: ${req.path}`);
  console.log(`\tHEADERS: ${JSON.stringify(req.headers)}`);
  console.log(`\tBODY: ${JSON.stringify(req.body)}`);
  next();
}
