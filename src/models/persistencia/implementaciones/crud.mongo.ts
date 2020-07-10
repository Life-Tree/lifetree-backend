import { CRUD } from "../interfaces/crud.interface";

import { Db, Collection, InsertOneWriteOpResult, ObjectId, WriteOpResult, ReplaceWriteOpResult } from "mongodb";
import { db } from "src/main";


export class CrudMongo<T> implements CRUD<T>{
    private collection: Collection;
    private db: Db;

    constructor(collectionName: string) {
        this.db = db;
        this.collection = this.db.collection(collectionName);
    }

    async create(item: T): Promise<boolean> {
        const result: InsertOneWriteOpResult<any> = await this.collection.insertOne(item);
        return !!result.result.ok;
    }

    async update(id: string, item: T): Promise<boolean> {
        let _id = new ObjectId(id);
        let result: ReplaceWriteOpResult = await this.collection.replaceOne({ "_id": _id }, item, { upsert: true });
        return !!result.result.ok;
    }

    async delete(id: string): Promise<boolean> {
        let _id = new ObjectId(id);
        let result: WriteOpResult = await this.collection.remove({ "_id": _id });
        return !!result.result.ok
    }

    async findAll(): Promise<T[]> {
        let result = await this.collection.find().toArray();
        return <T[]>result;
    }


    async findById(id: string): Promise<T> {
        let _id = new ObjectId(id);
        let result = await this.collection.findOne({ "_id": _id });
        return <T>result;
    }

}