import { CRUD } from "./interfaces/crud.interface";
import { CrudMongo } from "./implementaciones/crud.mongo";
import { Injectable } from "@nestjs/common";
import { CrudType } from "./constantes/consts";



@Injectable()
export class CrudFactory <T>{

    public createCRUD(type: CrudType, tablaName: string): CRUD<T>{
        let crud: CRUD<T>;
        switch(type){
            case CrudType.MONGODB:
                crud = new CrudMongo<T>(tablaName);
                break;
            default:
                crud = new CrudMongo<T>(tablaName);
                break;
        }
        return crud;
    }
}