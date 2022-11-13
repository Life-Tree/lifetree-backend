import { Injectable } from "@nestjs/common";
import { Collection, Db, ObjectId } from "mongodb";
import { db } from "src/main";
import { Permission } from "src/users/core/domain/permission";
import { IPermissionRepository } from "src/users/core/ports/outbounding/permission.repository";
import { PERMISSIONS_TABLE_NAME } from "../constants";
import { PermissionEntity, PermissionEntityMapper } from "./entities/permission.entity";

@Injectable()
export class PermissionRepositoryMongo implements IPermissionRepository{
    private collection: Collection;
    private db: Db;

    constructor(
        private entityMapper: PermissionEntityMapper){
        this.db = db;
        this.collection = this.db.collection(PERMISSIONS_TABLE_NAME);
    }
    async findPermissions(): Promise<Permission[]> {
        const entities: PermissionEntity[] = await this.collection.find().toArray();
        return this.entityMapper.entitysToDomains(<PermissionEntity[]> entities);
    }
    async findByName(name: string): Promise<Permission> {
        const entity: PermissionEntity = await this.collection.findOne({ "name": name });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }
    async findById(id: string): Promise<Permission> {
        const _id = new ObjectId(id);
        const entity: PermissionEntity = await this.collection.findOne({ "_id": _id });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }
}