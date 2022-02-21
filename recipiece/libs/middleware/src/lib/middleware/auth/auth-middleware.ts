import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { Session, User, UserService } from '@recipiece/database';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../types';

@Injectable()
export class RecipieceAuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    try {
      const [session, user] = await this.runAuth(authHeader);
      req.session = session;
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async runAuth(authHeader: string): Promise<[Session, User]> {
    if (Utils.nou(authHeader)) {
      throw new UnauthorizedException();
    }
    const rawToken = authHeader.replace('Bearer', '').trim();
    const session = await Session.deserialize(rawToken);
    if (Utils.nou(session)) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findById(session.owner);
    if (Utils.nou(user)) {
      throw new UnauthorizedException();
    }
    // @TODO -- handle permissions
    return [session, user];
  }
}
