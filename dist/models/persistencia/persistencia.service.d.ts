import { CrudFactory } from './crud.factory';
import { CrudType } from './constantes/consts';
export declare class PersistenciaService<T> {
    private crudFactory;
    constructor(crudFactory: CrudFactory<T>);
    saveOne(item: T, typeCrud: CrudType, collectionName: string): Promise<boolean>;
    getAll(typeCrud: CrudType, collectionName: string): Promise<T[]>;
    getOne(idItem: string, typeCrud: CrudType, collectionName: string): Promise<T>;
    updateOne(idItem: string, itemToUpdate: T, typeCrud: CrudType, collectionName: string): Promise<boolean>;
    deleteOne(idItem: string, typeCrud: CrudType, collectionName: string): Promise<boolean>;
}
