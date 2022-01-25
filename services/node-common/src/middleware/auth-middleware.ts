import * as Express from 'express';
import { IUser } from '../model/user/user.i';
import { UnauthorizedError } from '../error';
import { authRequest } from '../interop/auth-interop';
import { nou } from '../utils';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
    token?: string;
  }
}

export type AuthenticationFetcher = (token: string, requiredPermissions: string[]) => Promise<IUser>;

export async function defaultAuthFetcher(token: string, requiredPermissions: string[]): Promise<IUser> {
  return await authRequest({
    url: '/sessions/validate-token',
    method: 'POST',
    data: {
      token: token,
      permissions: requiredPermissions,
    },
  });
}

export function rcpAuthMiddleware(permissions?: string[], authFetcher?: AuthenticationFetcher) {
  return async (req: Express.Request, _: Express.Response, next: Express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (nou(authHeader)) {
      next(new UnauthorizedError());
    } else {
      const rawToken = authHeader.replace('Bearer', '').trim();
      const fetcher: AuthenticationFetcher = authFetcher ?? defaultAuthFetcher;
      try {
        const user = await fetcher(rawToken, permissions || []);
        req.user = user;
        req.token = rawToken;
        next();
      } catch (e) {
        next(new UnauthorizedError());
      }
    }
  };
}
