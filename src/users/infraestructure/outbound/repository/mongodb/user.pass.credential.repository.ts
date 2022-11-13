import { Injectable } from "@nestjs/common";
import { Collection, Db, ObjectId } from "mongodb";
import { db } from "src/main";
import { UserPassCredential } from "src/users/core/domain/userPassCredential";
import { IUserPassCredentialRepository } from "src/users/core/ports/outbounding/userPassCredential.repository";
import { USER_PASS_CREDENTIALS_TABLE_NAME } from "../constants";
import { UserPassCredentialEntity, UserPassCredentialEntityMapper } from "./entities/user.pass.credential.entity";

@Injectable()
export class UserPassCredentialRepositoryMongo implements IUserPassCredentialRepository{
    private collection: Collection;
    private db: Db;

    constructor(
        private entityMapper: UserPassCredentialEntityMapper){
        this.db = db;
        this.collection = this.db.collection(USER_PASS_CREDENTIALS_TABLE_NAME);
    }
    async getCredentialByEmail(email: string): Promise<UserPassCredential> {
        const entity: UserPassCredentialEntity = await this.collection.findOne({ "email": email });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }
    async getCredentialByUserId(userId: string): Promise<UserPassCredential> {
        const entity: UserPassCredentialEntity = await this.collection.findOne({ "userId": userId });
        return  entity ? this.entityMapper.entityToDomain(entity) : null;
    }
    async saveCredential(userPassCredential: UserPassCredential): Promise<UserPassCredential> {
        const entity = this.entityMapper.domainToEntity(userPassCredential)
        const result = await this.collection.insertOne(entity);
        const _id = result.insertedId;
        const savedEntity: UserPassCredentialEntity = await this.collection.findOne({ "_id": _id })
        return this.entityMapper.entityToDomain(savedEntity);
    }
    
    async updateCredential(userPassCredential: UserPassCredential): Promise<UserPassCredential> {
        const _id = new ObjectId(userPassCredential.getId());
        const entity = this.entityMapper.domainToEntity(userPassCredential);
        await this.collection.replaceOne({ "_id": _id }, entity, { upsert: true });
        const updatedEntity:UserPassCredentialEntity = await this.collection.findOne({ "_id": _id })
        return this.entityMapper.entityToDomain(updatedEntity);
    }
}