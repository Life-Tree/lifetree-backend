import { Material } from "src/pedagogic/core/domain/material";
import { IMaterialRepository } from "src/pedagogic/core/ports/outbounding/repository/material.repository";
import { MaterialEntity, MaterialEntityMapper } from "./entities/material.entity";
import { Db, Collection, InsertOneWriteOpResult, ObjectId, WriteOpResult, ReplaceWriteOpResult } from "mongodb";
import { db } from "src/main";
import { MATERIAL_TABLE_NAME } from "../constants";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongoMaterialRepository implements IMaterialRepository{
    private materialsCollection: Collection;
    private db: Db;
    constructor(private materialEntityMapper: MaterialEntityMapper){
        this.db = db;
        this.materialsCollection = this.db.collection(MATERIAL_TABLE_NAME);
    }

    async findAll(): Promise<Material[]> {
        const entities: MaterialEntity[] = await this.materialsCollection.find().toArray();
        return this.materialEntityMapper.entitysToDomains(<MaterialEntity[]> entities);
    }
    async findById(id: string): Promise<Material> {
        const _id = new ObjectId(id);
        const entity: MaterialEntity = await this.materialsCollection.findOne({ "_id": _id });
        return  this.materialEntityMapper.entityToDomain(entity);
    }
    async findByTitle(title: string): Promise<Material> {
        const entity: MaterialEntity = await this.materialsCollection.findOne({ "title": title });
        return  this.materialEntityMapper.entityToDomain(entity);
    }
    async save(material: Material): Promise<Material> {
        const entity = this.materialEntityMapper.domainToEntity(material)
        const result = await this.materialsCollection.insertOne(entity);
        const _id = result.insertedId;
        const savedEntity: MaterialEntity = await this.materialsCollection.findOne({ "_id": _id })
        return this.materialEntityMapper.entityToDomain(savedEntity);
    }
    async update(material: Material): Promise<Material> {
        const _id = new ObjectId(material.getId());
        const entity = this.materialEntityMapper.domainToEntity(material);
        const result: ReplaceWriteOpResult = await this.materialsCollection.replaceOne({ "_id": _id }, entity, { upsert: true });
        const updatedEntity:MaterialEntity = await this.materialsCollection.findOne({ "_id": _id })
        return this.materialEntityMapper.entityToDomain(updatedEntity);
    }
    
}