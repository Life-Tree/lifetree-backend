import { Inject, Injectable } from "@nestjs/common";
import { Permission } from "../core/domain/permission";
import { Role } from "../core/domain/role";
import { IPermissionService } from "../core/ports/inbounding/permission.service";
import { IRoleService } from "../core/ports/inbounding/role.service";
import { IRoleRepository } from "../core/ports/outbounding/role.repository";

@Injectable()
export class RoleServiceImpl implements IRoleService{
    constructor(
        @Inject('RoleRepositoryMongo')
        private roleRepo: IRoleRepository, 
        @Inject('PermissionServiceImpl')
        private permissionService: IPermissionService){}
    getRoles(): Promise<Role[]> {
        return this.roleRepo.findRoles();
    }
    getRoleByRoleName(roleName: string): Promise<Role> {
        return this.roleRepo.findByRoleName(roleName);
    }
    getRoleById(id: string): Promise<Role> {
        return this.roleRepo.findById(id);
    }
    async hasPermission(roleId: string, permissionName: string): Promise<boolean> {
        const permission: Permission = await this.permissionService.getPermissionByName(permissionName);
        return this.roleRepo.hasPermission(roleId, permission.getId());
    }
    
}