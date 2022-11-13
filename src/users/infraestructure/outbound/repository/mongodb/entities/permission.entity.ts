import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Permission } from "src/users/core/domain/permission";
import { PermissionName } from "src/users/core/enums/enums";

export class PermissionEntity {
    public _id?: ObjectId;
    public name: PermissionName;
}

@Injectable()
export class PermissionEntityMapper{
    public async entityToDomain(entity: PermissionEntity): Promise<Permission>{
        const domain = new Permission();
        domain.setId(entity._id.toHexString());
        domain.setName(entity.name);
        return domain;
    }

    public async entitysToDomains(entities: PermissionEntity[]): Promise<Permission[]> {
        const domains: Permission[] = [];
        for (const entity of entities) {
            const domain = await this.entityToDomain(entity);
            domains.push(domain);
        }
        return domains;
    }

    public domainToEntity(domain: Permission): PermissionEntity {
        const entity: PermissionEntity = new PermissionEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.name = domain.getName();
        return entity;
    }
}