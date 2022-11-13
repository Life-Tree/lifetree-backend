import { Injectable } from "@nestjs/common";
import { Collection, Db, ObjectId } from "mongodb";
import { db } from "src/main";
import { Role } from "src/users/core/domain/role";
import { IRoleRepository } from "src/users/core/ports/outbounding/role.repository";
import { ROLES_TABLE_NAME } from "../constants";
import { RoleEntity, RoleEntityMapper } from "./entities/role.entity";

@Injectable()
export class RoleRepositoryMongo implements IRoleRepository{
    private collection: Collection;
    private db: Db;

    constructor(
        private entityMapper: RoleEntityMapper){
        this.db = db;
        this.collection = this.db.collection(ROLES_TABLE_NAME);
    }
    async findRoles(): Promise<Role[]> {
        const entities: RoleEntity[] = await this.collection.find().toArray();
        return this.entityMapper.entitysToDomains(<RoleEntity[]> entities);
    }
    async findByRoleName(roleName: string): Promise<Role> {
        const entity: RoleEntity = await this.collection.findOne({ "name": roleName });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }
    async findById(id: string): Promise<Role> {
        const _id = new ObjectId(id);
        const entity: RoleEntity = await this.collection.findOne({ "_id": _id });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }

    async hasPermission(roleId: string, permissionId: string): Promise<boolean> {
        const entity: RoleEntity = await this.collection.findOne({ "_id": roleId });
        const permId: ObjectId = new ObjectId(permissionId);
        return entity.permissions.includes(permId);
    }
    
}