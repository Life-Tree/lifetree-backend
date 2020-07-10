export interface CRUD<T>{

    create(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}