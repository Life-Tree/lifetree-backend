import { Injectable } from "@nestjs/common";
import { Collection, Db, ObjectId } from "mongodb";
import { db } from "src/main";
import { SIGNSYMPTOM_TABLE_NAME } from "../constants";
import { ISignSymptomRepository } from "src/reports/core/ports/outbounding/repository/signsymptom.repository";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { SignSymptomEntityMapper } from "./entities/signsymptom.entity.mapper";
import { SignSymptomEntity } from "./entities/signsymptom.entity";

@Injectable()
export class SignSymptomRepository implements ISignSymptomRepository{
    private collection: Collection;
    private db: Db;

    constructor(private entityMapper: SignSymptomEntityMapper){
        this.db = db;
        this.collection = this.db.collection(SIGNSYMPTOM_TABLE_NAME);
    }

    async findSignSymptomById(id: string): Promise<SignSymptom> {
        const _id = new ObjectId(id);
        const entity: SignSymptomEntity = await this.collection.findOne({ "_id": _id });
        return  this.entityMapper.entityToDomain(entity);
    }
    
    async findSignSymptoms(): Promise<SignSymptom[]> {
        const entities = await this.collection.find().toArray();
        return this.entityMapper.entitysToDomains(<SignSymptomEntity[]> entities);
    }

}