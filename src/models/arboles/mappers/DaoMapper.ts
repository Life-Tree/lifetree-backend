import { Injectable } from "@nestjs/common";
import { CrudType } from "src/models/persistencia/constantes/consts";
import { PersistenciaService } from "src/models/persistencia/persistencia.service";
import { Arbol } from "../clases/arbol";
import { Species } from "../clases/especie";
import { TABLA_NAME_SPECIES } from "../consts/constantes";
import { ArbolDao } from "./ArbolDao";

@Injectable()
export class DaoMapper{

    constructor (private persistencia: PersistenciaService<Species>){
        
    }

    public modelToDao(model: Arbol): ArbolDao {
        let arbolDao: ArbolDao = new ArbolDao();
        arbolDao.descripcion = model.getDescripcion();
        arbolDao.estado = model.getEstado();
        arbolDao.imageSet = model.getImageSet();
        arbolDao.intervenciones = model.getIntervenciones();
        arbolDao.ubicacion = model.getUbicacion();
        arbolDao.species = model.getSpecies().get_Id();
        return arbolDao;
    }

    public async daoToModel(dao: ArbolDao): Promise<Arbol> {
        let model: Arbol = new Arbol(dao.descripcion, dao.ubicacion, dao.imageSet);
        model.set_Id(dao._id.toHexString());
        model.setEstado(dao.estado);
        model.setIntervenciones(dao.intervenciones);
        let species = await this.persistencia.getOne(dao.species.toHexString(), CrudType.MONGODB, TABLA_NAME_SPECIES);
        model.setSpecies(species);
        return model;        
    }

    public async daoToModelMany(daos: ArbolDao[]): Promise<Arbol[]> {
        let arboles: Arbol[] = [];
        for (const dao of daos){
            let model: Arbol = new Arbol(dao.descripcion, dao.ubicacion, dao.imageSet);
            model.set_Id(dao._id.toHexString());
            model.setEstado(dao.estado);
            model.setIntervenciones(dao.intervenciones);
            let species = await this.persistencia.getOne(dao.species.toHexString(), CrudType.MONGODB, TABLA_NAME_SPECIES);
            model.setSpecies(species);
            arboles.push(model);
        }
        return arboles;             
    }
}