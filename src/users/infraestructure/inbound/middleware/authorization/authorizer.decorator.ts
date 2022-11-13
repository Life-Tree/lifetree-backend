import { SetMetadata } from '@nestjs/common';
import { PermissionName } from 'src/users/core/enums/enums';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: PermissionName[]) => SetMetadata(PERMISSIONS_KEY, permissions);