import { Injectable } from '@nestjs/common';
import { Arbol } from './clases/arbol';
import { Intervencion } from './clases/intervencion';
import { Ubicacion } from './clases/ubicacion';
import { CrudType } from '../persistencia/constantes/consts';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { VisionServiceFactoryService } from '../vision-Service/visionServiceFactory.service';
import { StorageServiceFactoryService } from '../storage-Service/storageServiceFactory.service';
import { IVisionService } from '../vision-Service/interfaces/visionService.interface';
import { VISION_SERVICE } from '../vision-Service/constantes/serviceVision.enum';
import { IStorageService } from '../storage-Service/interfaces/storageService.interface';
import { STORAGE_SERVICE } from '../storage-Service/constantes/serviceStorage.enum';

@Injectable()
export class ArbolesService {

    constructor(private persistencia: PersistenciaService<Arbol>,        
        private storageServiceFactory:StorageServiceFactoryService,
        private visionServiceFactory:VisionServiceFactoryService){

    }

    public async nuevoArbol(descripcion: string, img: string, lat: number, lon: number, barrio: string): Promise<boolean>{
        let ubicacion = new Ubicacion(lat,lon,barrio);
        let nuevoArbol = new Arbol(descripcion,img,ubicacion);
        console.log("punto1");        
        const visionService:IVisionService = this.visionServiceFactory.getVisionService(VISION_SERVICE.GOOGLE_VISION);
        console.log("punto2");        
        let esArbol: boolean = await visionService.isTree(img);
        console.log(esArbol);
        if(esArbol){            
            const storageService:IStorageService = this.storageServiceFactory.getSorageService(STORAGE_SERVICE.GOOGLE_STORAGE);
            let imagenURL = await storageService.uploadFile(img);
            console.log(imagenURL);
            nuevoArbol.setImagenURL(imagenURL);
            return await this.persistencia.saveOne(nuevoArbol,CrudType.MONGODB,"arboles");
        }
        return false;   
    }

    public async getArboles(): Promise<Arbol[]>{        
        return await this.persistencia.getAll(CrudType.MONGODB, "arboles");
    }

    public async getArbol(id: string): Promise<Arbol>{
        return await this.persistencia.getOne(id, CrudType.MONGODB, "arboles");
    }

    public async updateArbol(id: string, descripcion: string, img: string, lat: number, lon: number, barrio: string): Promise<boolean>{
        let ubicacion = new Ubicacion(lat,lon,barrio);
        let nuevoArbol = new Arbol(descripcion,img,ubicacion);
        return await this.persistencia.updateOne(id,nuevoArbol,CrudType.MONGODB, "arboles");
    }

    public async deleteArbol(id: string): Promise<boolean>{
        return await this.persistencia.deleteOne(id, CrudType.MONGODB, "arboles");
    }

}
