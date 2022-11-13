import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionName } from 'src/users/core/enums/enums';
import { IAuthorizer } from 'src/users/core/ports/inbounding/authorizer';
import { PERMISSIONS_KEY } from './authorizer.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('Authorizer')
    private authorizer: IAuthorizer
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<PermissionName[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return await this.authorizer.hasPermission(user.userId, requiredPermissions);
  }
}