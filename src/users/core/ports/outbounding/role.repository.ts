import { Role } from "../../domain/role";

export interface IRoleRepository{
    findRoles(): Promise<Role[]>;
    findByRoleName(roleName: string): Promise<Role>;
    findById(id: string): Promise<Role>;
    hasPermission(roleId:string, permissionId: string): Promise<boolean>;
}