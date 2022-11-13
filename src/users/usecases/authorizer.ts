import { Inject, Injectable } from "@nestjs/common";
import { Permission } from "../core/domain/permission";
import { Role } from "../core/domain/role";
import { User } from "../core/domain/user";
import { PermissionName } from "../core/enums/enums";
import { IAuthorizer } from "../core/ports/inbounding/authorizer";
import { IUserService } from "../core/ports/inbounding/user.service";

@Injectable()
export class Authorizer implements IAuthorizer{
    constructor(
        @Inject('UserServiceImpl')
        private userService: IUserService
    ){}
    async hasPermission(userId: string, permissionsNames: PermissionName[]): Promise<boolean> {
        const user: User = await this.userService.getUserById(userId);
        return user && this.searchPermissionInRole(user.getRole(), permissionsNames);
    }

    private searchPermissionInRole(role: Role, permissionsNames: PermissionName[]): boolean{
        const permissions: Permission[] = role.getPermissions().filter(permission => permissionsNames.includes(permission.getName()));
        return permissions && permissions.length === permissionsNames.length;
    }
    
}