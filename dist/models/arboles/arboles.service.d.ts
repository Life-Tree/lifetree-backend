import { Arbol } from './clases/arbol';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { VisionServiceFactoryService } from '../vision-Service/visionServiceFactory.service';
import { StorageServiceFactoryService } from '../storage-Service/storageServiceFactory.service';
export declare class ArbolesService {
    private persistencia;
    private storageServiceFactory;
    private visionServiceFactory;
    constructor(persistencia: PersistenciaService<Arbol>, storageServiceFactory: StorageServiceFactoryService, visionServiceFactory: VisionServiceFactoryService);
    nuevoArbol(descripcion: string, img: string, lat: number, lon: number, barrio: string): Promise<string>;
    getArboles(): Promise<Arbol[]>;
    getArbol(id: string): Promise<Arbol>;
    updateArbol(id: string, descripcion: string, img: string, lat: number, lon: number, barrio: string): Promise<boolean>;
    deleteArbol(id: string): Promise<boolean>;
}
