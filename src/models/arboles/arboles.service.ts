import { Injectable } from '@nestjs/common';
import { Arbol, EstadoArbol} from './clases/arbol';
import { Ubicacion } from './clases/ubicacion';
import { CrudType } from '../persistencia/constantes/consts';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { VisionServiceFactoryService } from '../vision-Service/visionServiceFactory.service';
import { StorageServiceFactoryService } from '../storage-Service/storageServiceFactory.service';
import { IVisionService } from '../vision-Service/interfaces/visionService.interface';
import { VISION_SERVICE } from '../vision-Service/constantes/serviceVision.enum';
import { IStorageService } from '../storage-Service/interfaces/storageService.interface';
import { STORAGE_SERVICE } from '../storage-Service/constantes/serviceStorage.enum';
import { ResultMesagge } from './enums/enums';
import { TABLA_NAME_ARBOL, TABLA_NAME_SPECIES } from './consts/constantes';
import { Intervencion } from './clases/intervencion';
import { ImageSet } from './clases/imageset';
import { Image } from './clases/image';
import { Species } from './clases/especie';
import { DaoMapper } from './mappers/DaoMapper';
import { ArbolDao } from './mappers/ArbolDao';

@Injectable()
export class ArbolesService {

    constructor(private persistencia: PersistenciaService<ArbolDao>,
        private persistenciaSpecies: PersistenciaService<Species>,        
        private storageServiceFactory:StorageServiceFactoryService,
        private visionServiceFactory:VisionServiceFactoryService,
        private mapperService: DaoMapper){
        
    }

    public async nuevoArbol(descripcion: string, images: ImageSet, lat: number, lon: number, barrio: string, species?: Species): Promise<string>{
        let ubicacion = new Ubicacion(lat,lon,barrio);
        let nuevoArbol = new Arbol(descripcion, ubicacion, images);
        if (species != null){
            nuevoArbol.setSpecies(species);
        }       
        //const visionService:IVisionService = this.visionServiceFactory.getVisionService(VISION_SERVICE.GOOGLE_VISION);               
        let esArbol:boolean = true; //await visionService.isTree(img);
        console.log(esArbol);
        if(esArbol){
            nuevoArbol = await this.preProcessArbolImages(nuevoArbol);
            let dao: ArbolDao = this.mapperService.modelToDao(nuevoArbol);
            let guardado = await this.persistencia.saveOne(dao,CrudType.MONGODB,TABLA_NAME_ARBOL);
            return guardado? ResultMesagge.EXITO : ResultMesagge.PROBLEMA_EN_BASE_DE_DATOS;
        }else{
            return ResultMesagge.NO_ES_ARBOL;
        }  
    }

    public async getArboles(): Promise<Arbol[]>{
        let daos = await this.persistencia.getAll(CrudType.MONGODB, TABLA_NAME_ARBOL);
        return this.mapperService.daoToModelMany(daos);
    }

    public async getArbol(id: string): Promise<Arbol>{
        let dao = await this.persistencia.getOne(id, CrudType.MONGODB, TABLA_NAME_ARBOL);
        return this.mapperService.daoToModel(dao);
    }

    public async updateArbol(id: string, descripcion: string, images: ImageSet, lat: number, lon: number, barrio: string,
        estado: EstadoArbol ,intervenciones: Intervencion[], tipoUpdate:"IMAGE_CHANGE"|"NO_IMAGE_CHANGE", species: Species ): Promise<boolean>{
        if(tipoUpdate == "IMAGE_CHANGE"){
            let ubicacion = new Ubicacion(lat,lon,barrio);
            let nuevoArbol = new Arbol(descripcion,ubicacion, images);
            nuevoArbol.setIntervenciones(intervenciones);
            nuevoArbol = await this.preProcessArbolImages(nuevoArbol);
            nuevoArbol.setEstado(estado);
            nuevoArbol.setSpecies(species);
            let dao = this.mapperService.modelToDao(nuevoArbol);
            return this.persistencia.updateOne(id,dao,CrudType.MONGODB, TABLA_NAME_ARBOL);
        }else{
            let ubicacion = new Ubicacion(lat,lon,barrio);
            let nuevoArbol = new Arbol(descripcion,ubicacion, images);
            nuevoArbol.setIntervenciones(intervenciones);
            nuevoArbol.setEstado(estado);
            nuevoArbol.setSpecies(species);
            let dao = this.mapperService.modelToDao(nuevoArbol);
            return this.persistencia.updateOne(id,dao,CrudType.MONGODB, TABLA_NAME_ARBOL);
        }
    }

    public async deleteArbol(id: string): Promise<boolean>{
        return this.persistencia.deleteOne(id, CrudType.MONGODB, TABLA_NAME_ARBOL);
    }

    public async getAllSpecies(): Promise<Species[]>{
        return this.persistenciaSpecies.getAll(CrudType.MONGODB, TABLA_NAME_SPECIES);
    }

    private async preProcessArbolImages(nuevoArbol: Arbol): Promise<Arbol> {         
        const storageService:IStorageService = this.storageServiceFactory.getSorageService(STORAGE_SERVICE.CLOUDINARY_STORAGE);        
        let allImages: Image[] = nuevoArbol.getImageSet().images;
        let allImagesNew: Image[] = [];

        for (const img of allImages){
            if(img.base64 != ""){
                img.url = await storageService.uploadFile(img.base64);
                img.base64 = "";                
            }
            allImagesNew.push(img);
        }

        nuevoArbol.setImageSet(new ImageSet(allImagesNew));

        let intervenciones: Intervencion[] = nuevoArbol.getIntervenciones();    
        
        for (let [index, inter] of intervenciones.entries()){            
            let allInterImages: Image[] = inter.imageSet.images;        
            let allInterImagesNew: Image[] = [];
            for (const img of allInterImages){
                if(img.base64 != ""){
                    img.url = await storageService.uploadFile(img.base64);
                    img.base64 = "";                
                }
                allInterImagesNew.push(img);
            }
            inter.imageSet = new ImageSet(allInterImagesNew);
            intervenciones[index] = inter;
        }

        nuevoArbol.setIntervenciones(intervenciones);
        return nuevoArbol;
    }

}
