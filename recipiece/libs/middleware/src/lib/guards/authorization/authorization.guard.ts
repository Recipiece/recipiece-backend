import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPermissionsLevel } from '@recipiece/database';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private permissionService: UserPermissionsService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<UserPermissionsLevel[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // const userPermissions = this.permissionService.findOne({owner: user.id});
    // @TODO -- check user permissions
  }
}
