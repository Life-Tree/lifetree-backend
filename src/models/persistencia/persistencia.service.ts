import { Injectable } from '@nestjs/common';
import { CrudFactory} from './crud.factory';
import { CRUD } from './interfaces/crud.interface';
import { CrudType } from './constantes/consts';

@Injectable()
export class PersistenciaService <T> {

    private crudFactory: CrudFactory<T>   

    constructor(crudFactory: CrudFactory<T>){
        this.crudFactory = crudFactory;
    }
    
    public saveOne(item: T, typeCrud: CrudType, collectionName: string): Promise<boolean>{        
        let crud: CRUD<T> = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.create(item);
    }

    public getAll(typeCrud: CrudType, collectionName: string):Promise<T[]>{
        let crud: CRUD<T> = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.findAll();
    }

    public getOne(idItem: string, typeCrud: CrudType, collectionName: string): Promise<T>{
        let crud: CRUD<T> = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.findById(idItem);
    }

    public updateOne(idItem: string, itemToUpdate: T,  typeCrud: CrudType, collectionName: string): Promise<boolean>{
        let crud: CRUD<T> = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.update(idItem, itemToUpdate);
    }

    public deleteOne(idItem: string, typeCrud: CrudType, collectionName: string): Promise<boolean>{
        let crud: CRUD<T> = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.delete(idItem);
    }
}
