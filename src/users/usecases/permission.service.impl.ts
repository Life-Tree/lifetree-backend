import { Inject, Injectable } from "@nestjs/common";
import { Permission } from "../core/domain/permission";
import { IPermissionService } from "../core/ports/inbounding/permission.service";
import { IPermissionRepository } from "../core/ports/outbounding/permission.repository";

@Injectable()
export class PermissionServiceImpl implements IPermissionService{
    constructor(
        @Inject('PermissionRepositoryMongo')
        private permissionRepo: IPermissionRepository){}
    getPermissions(): Promise<Permission[]> {
        return this.permissionRepo.findPermissions();
    }
    getPermissionByName(name: string): Promise<Permission> {
        return this.permissionRepo.findByName(name);
    }

}