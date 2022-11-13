import { Role } from "../../domain/role";

export interface IRoleService{
    getRoles(): Promise<Role[]>;
    getRoleByRoleName(roleName: string): Promise<Role>;
    getRoleById(id: string): Promise<Role>;
    hasPermission(roleId: string, permissionName: string): Promise<boolean>; 
}