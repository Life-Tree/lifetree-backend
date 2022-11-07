import { Injectable } from "@nestjs/common";
import { Collection, Db, ObjectId } from "mongodb";
import { db } from "src/main";
import { CONDITIONS_TABLE_NAME } from "../constants";
import { IConditionRepository } from "src/reports/core/ports/outbounding/repository/condition.repository";
import { Condition } from "src/reports/core/domain/condition";
import { ConditionEntity } from "./entities/condition.entity";
import { ConditionEntityMapper } from "./entities/condition.entity.mapper";

@Injectable()
export class ConditionsRepository implements IConditionRepository{
    private collection: Collection;
    private db: Db;

    constructor(private entityMapper: ConditionEntityMapper){
        this.db = db;
        this.collection = this.db.collection(CONDITIONS_TABLE_NAME);
    }
    async findConditions(): Promise<Condition[]> {
        const entities = await this.collection.find().toArray();
        return this.entityMapper.entitysToDomains(<ConditionEntity[]> entities);
    }
    async findConditionById(id: string): Promise<Condition> {
        const _id = new ObjectId(id);
        const entity: ConditionEntity = await this.collection.findOne({ "_id": _id });
        return  this.entityMapper.entityToDomain(entity);
    }

}