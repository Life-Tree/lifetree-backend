import { Db, Collection, InsertOneWriteOpResult, ObjectId, WriteOpResult, ReplaceWriteOpResult } from "mongodb";
import { db } from "src/main";
import { Injectable } from "@nestjs/common";
import { TREES_TABLE_NAME } from "../constants";
import { ITreeRepository } from "src/reports/core/ports/outbounding/repository/tree.repository";
import { Tree } from "src/reports/core/domain/tree";
import { TreeEntity } from "./entities/tree.entity";
import { TreeEntityMapper } from "./entities/tree.entity.mapper";

@Injectable()
export class TreeRepository implements ITreeRepository {

    private treesCollection: Collection;
    private db: Db;

    constructor(private treeEntityMapper: TreeEntityMapper){
        this.db = db;
        this.treesCollection = this.db.collection(TREES_TABLE_NAME);
    }
    async findTreeById(id: string): Promise<Tree> {
        const _id = new ObjectId(id);
        const entity: TreeEntity = await this.treesCollection.findOne({ "_id": _id });
        return this.treeEntityMapper.entityToDomain(entity);
    }
    async findAllTrees(): Promise<Tree[]> {
        let entities: TreeEntity[] = await this.treesCollection.find().toArray();
        return this.treeEntityMapper.entitysToDomains(entities);
    }
    async saveTree(tree: Tree): Promise<Tree> {
        const result = await this.treesCollection.insertOne(this.treeEntityMapper.domainToEntity(tree));
        const _id = result.insertedId;
        const savedEntity: TreeEntity = await this.treesCollection.findOne({ "_id": _id })
        return this.treeEntityMapper.entityToDomain(savedEntity);
    }
    
}