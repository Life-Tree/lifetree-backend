import { CRUD } from "./interfaces/crud.interface";
import { CrudMongo } from "./implementaciones/crud.mongo";
import { Injectable } from "@nestjs/common";
import { CrudType } from "./constantes/consts";


@Injectable()
export class CrudFactory <T>{

    public crudsCreated: Map<string, CRUD<T>> = new Map<string, CRUD<T>>();

    public createCRUD(type: CrudType, tablaName: string): CRUD<T>{
        let crud: CRUD<T>;
        switch(type){
            case CrudType.MONGODB:
                if(this.crudsCreated.has(type.toString()+':'+tablaName)){
                    crud = this.crudsCreated.get(type.toString()+':'+tablaName);
                }else{
                    crud = new CrudMongo<T>(tablaName);
                    this.crudsCreated.set(type.toString()+':'+tablaName,crud);
                }                
                break;
            default:
                if(this.crudsCreated.has(type.toString()+':'+tablaName)){
                    crud = this.crudsCreated.get(type.toString()+':'+tablaName);
                }else{
                    crud = new CrudMongo<T>(tablaName);
                    this.crudsCreated.set(type.toString()+':'+tablaName,crud);
                } 
                break;
        }
        return crud;
    }
}