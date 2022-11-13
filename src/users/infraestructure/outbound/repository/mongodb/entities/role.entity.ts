import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Permission } from "src/users/core/domain/permission";
import { Role } from "src/users/core/domain/role";
import { IPermissionRepository } from "src/users/core/ports/outbounding/permission.repository";

export class RoleEntity{
    public _id?: ObjectId;
    public name: string;
    public permissions: ObjectId[];
}

@Injectable()
export class RoleEntityMapper{
    constructor(
        @Inject('PermissionRepositoryMongo')
        private permissionRepository: IPermissionRepository
    ){}
    public async entityToDomain(entity: RoleEntity): Promise<Role>{
        const domain = new Role();
        domain.setId(entity._id.toHexString());
        domain.setName(entity.name);
        const permissions: Permission[] = [];
        for (const _permId of entity.permissions) {
            const permission: Permission = await this.permissionRepository.findById(_permId.toHexString());   
            permissions.push(permission);
        }
        domain.setPermissions(permissions);
        return domain;
    }

    public async entitysToDomains(entities: RoleEntity[]): Promise<Role[]> {
        const domains: Role[] = [];
        for (const entity of entities) {
            const domain = await this.entityToDomain(entity);
            domains.push(domain);
        }
        return domains;
    }

    public domainToEntity(domain: Role): RoleEntity {
        const entity: RoleEntity = new RoleEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.name = domain.getName();
        entity.permissions = [];
        domain.getPermissions().forEach(permission => {
            entity.permissions.push(new ObjectId(permission.getId()));
        });
        return entity;
    }
}