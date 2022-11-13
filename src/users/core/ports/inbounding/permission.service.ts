import { Permission } from "../../domain/permission";

export interface IPermissionService{
    getPermissions(): Promise<Permission[]>;
    getPermissionByName(name: string): Promise<Permission>;
}