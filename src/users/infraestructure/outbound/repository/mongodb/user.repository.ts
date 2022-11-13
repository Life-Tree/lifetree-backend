import { Injectable, Inject } from "@nestjs/common";
import { Collection, Db, ObjectId } from "mongodb";
import { db } from "src/main";
import { Role } from "src/users/core/domain/role";
import { User } from "src/users/core/domain/user";
import { IRoleRepository } from "src/users/core/ports/outbounding/role.repository";
import { IUserRepository } from "src/users/core/ports/outbounding/user.repository";
import { USERS_TABLE_NAME } from "../constants";
import { UserEntity, UserEntityMapper } from "./entities/user.entiy";

@Injectable()
export class UserRepositoryMongo implements IUserRepository{
    private collection: Collection;
    private db: Db;

    constructor(
        @Inject('RoleRepositoryMongo')
        private roleRepo: IRoleRepository,
        private entityMapper: UserEntityMapper){
        this.db = db;
        this.collection = this.db.collection(USERS_TABLE_NAME);
    }
    async findByEmail(email: string): Promise<User> {
        const entity: UserEntity = await this.collection.findOne({ "email": email });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }
    async findById(id: string): Promise<User> {
        const _id = new ObjectId(id);
        const entity: UserEntity = await this.collection.findOne({ "_id": _id });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }
    async findUsersByRoleName(roleName: string): Promise<User[]> {
        const role: Role = await this.roleRepo.findByRoleName(roleName);
        const entities: UserEntity[] = await this.collection.find({ "role": new ObjectId(role.getId())}).toArray();
        return this.entityMapper.entitysToDomains(<UserEntity[]> entities);
    }
    async findUsers(): Promise<User[]> {
        const entities: UserEntity[] = await this.collection.find().toArray();
        return this.entityMapper.entitysToDomains(<UserEntity[]> entities);
    }
    async save(user: User): Promise<User> {
        const entity = this.entityMapper.domainToEntity(user)
        const result = await this.collection.insertOne(entity);
        const _id = result.insertedId;
        const savedEntity: UserEntity = await this.collection.findOne({ "_id": _id })
        return this.entityMapper.entityToDomain(savedEntity);
    }

    async update(user: User): Promise<User> {
        const _id = new ObjectId(user.getId());
        const entity = this.entityMapper.domainToEntity(user);
        await this.collection.replaceOne({ "_id": _id }, entity, { upsert: true });
        const updatedEntity:UserEntity = await this.collection.findOne({ "_id": _id })
        return this.entityMapper.entityToDomain(updatedEntity);
    }
}