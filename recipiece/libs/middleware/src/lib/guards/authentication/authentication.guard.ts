import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { Session, SessionService, User, UserService } from '@recipiece/database';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private userService: UserService, private sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const [session, user] = await this.runAuth(authHeader);
    request.session = session;
    request.user = user;
    return true;
  }

  private async runAuth(authHeader: string): Promise<[Session, User]> {
    if (Utils.nou(authHeader)) {
      throw new UnauthorizedException();
    }
    const rawToken = authHeader.replace('Bearer', '').trim();
    const session = await this.sessionService.deserialize(rawToken);
    if (Utils.nou(session)) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getById(session.owner_id);
    if (Utils.nou(user)) {
      throw new UnauthorizedException();
    }
    return [session, user];
  }
}
