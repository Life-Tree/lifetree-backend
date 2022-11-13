import { Permission } from "../../domain/permission";

export interface IPermissionRepository{
    findPermissions(): Promise<Permission[]>;
    findByName(name: string): Promise<Permission>;
    findById(id: string): Promise<Permission>;
}