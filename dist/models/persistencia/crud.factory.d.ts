import { CRUD } from "./interfaces/crud.interface";
import { CrudType } from "./constantes/consts";
export declare class CrudFactory<T> {
    createCRUD(type: CrudType, tablaName: string): CRUD<T>;
}
