import { Environment } from '../environment';
import * as Express from 'express';

export function rcpLoggerMiddleware(req: Express.Request, _: Express.Response, next: Express.NextFunction) {
  if (!Environment.IS_TEST) {
    console.log(`[${new Date().toLocaleString()}] ${req.method} @ ${req.path}`);
    console.log(`  Request-Headers`);
    JSON.stringify(req.headers, null, 2)
      .split('\n')
      .forEach((h) => {
        console.log(`    ${h}`);
      });
    if (req.body) {
      console.log(`  Request-Body`);
      JSON.stringify(req.body, null, 2)
        .split('\n')
        .forEach((b) => {
          console.log(`    ${b}`);
        });
    }
  }
  next();
}
