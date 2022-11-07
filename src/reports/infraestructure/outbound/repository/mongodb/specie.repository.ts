import { Injectable } from "@nestjs/common";
import { Collection, Db, ObjectId } from "mongodb";
import { Specie } from "src/reports/core/domain/specie";
import { ISpecieRepository } from "src/reports/core/ports/outbounding/repository/species.repotitory";
import { db } from "src/main";
import { SPECIES_TABLE_NAME } from "../constants";
import { SpecieEntityMapper } from "./entities/specie.entity.mapper";
import { SpecieEntity } from "./entities/specie.entity";

@Injectable()
export class SpeciesRepository implements ISpecieRepository{
    private collection: Collection<SpecieEntity>;
    private db: Db;

    constructor(private entityMapper: SpecieEntityMapper){
        this.db = db;
        this.collection = this.db.collection(SPECIES_TABLE_NAME);
    }
    async findSpecieById(id: string): Promise<Specie> {
        const _id = new ObjectId(id);
        const entity: SpecieEntity = await this.collection.findOne({ "_id": _id });
        return  this.entityMapper.entityToDomain(entity);
    }
    async findSpecies(): Promise<Specie[]> {
        const entities:SpecieEntity[] = await this.collection.find().toArray();
        return this.entityMapper.entitysToDomains(<SpecieEntity[]> entities);
    }

}