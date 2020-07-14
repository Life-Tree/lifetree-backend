import { CRUD } from "../interfaces/crud.interface";
export declare class CrudMongo<T> implements CRUD<T> {
    private collection;
    private db;
    constructor(collectionName: string);
    create(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}
