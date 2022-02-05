import * as Express from 'express';
import { UnauthorizedError } from '../error';
import { Session, User, UserModel } from '../model';
import { nou } from '../utils';

export function rcpAuthMiddleware(permissions?: string[]) {
  return async (req: Express.Request, _: Express.Response, next: Express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    try {
      const [session, user] = await runAuth(authHeader, permissions);
      req.session = session;
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };
}

async function runAuth(authHeader: string, permissions?: string[]): Promise<[Session, User]> {
  if (nou(authHeader)) {
    throw new UnauthorizedError();
  }
  const rawToken = authHeader.replace('Bearer', '').trim();
  const session = await Session.deserialize(rawToken);
  if (nou(session)) {
    throw new UnauthorizedError();
  }
  const user = await UserModel.findById(session.owner);
  if (nou(user)) {
    throw new UnauthorizedError();
  }
  // @TODO -- handle permissions
  return [session, user];
}
