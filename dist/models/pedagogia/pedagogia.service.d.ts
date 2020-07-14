import { MaterialPedagogico } from './clases/material-pedagogico';
import { PersistenciaService } from '../persistencia/persistencia.service';
export declare class PedagogiaService {
    private persistencia;
    constructor(persistencia: PersistenciaService<MaterialPedagogico>);
    nuevoMP(titulo: string, descripcion: string, dataURL: string): Promise<boolean>;
    getMPs(): Promise<MaterialPedagogico[]>;
    getMP(id: string): Promise<MaterialPedagogico>;
    updateMP(id: string, titulo: string, descripcion: string, dataURL: string): Promise<boolean>;
    deleteMP(id: string): Promise<boolean>;
}
