export interface CRUD<T>{

    create(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    findByParams(param1:string, value1:string, param2:string,  value2:string): Promise<T[]>;
}