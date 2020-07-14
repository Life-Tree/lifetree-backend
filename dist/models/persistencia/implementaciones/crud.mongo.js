"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudMongo = void 0;
const mongodb_1 = require("mongodb");
const main_1 = require("../../../main");
class CrudMongo {
    constructor(collectionName) {
        this.db = main_1.db;
        this.collection = this.db.collection(collectionName);
    }
    async create(item) {
        const result = await this.collection.insertOne(item);
        return !!result.result.ok;
    }
    async update(id, item) {
        let _id = new mongodb_1.ObjectId(id);
        let result = await this.collection.replaceOne({ "_id": _id }, item, { upsert: true });
        return !!result.result.ok;
    }
    async delete(id) {
        let _id = new mongodb_1.ObjectId(id);
        let result = await this.collection.remove({ "_id": _id });
        return !!result.result.ok;
    }
    async findAll() {
        let result = await this.collection.find().toArray();
        return result;
    }
    async findById(id) {
        let _id = new mongodb_1.ObjectId(id);
        let result = await this.collection.findOne({ "_id": _id });
        return result;
    }
}
exports.CrudMongo = CrudMongo;
//# sourceMappingURL=crud.mongo.js.map