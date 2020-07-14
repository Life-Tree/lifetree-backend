import { ArbolDTO } from "./arbol.dto";
import { ArbolesService } from '../../models/arboles/arboles.service';
import { Arbol } from '../../models/arboles/clases/arbol';
export declare class ArbolesController {
    private arbolesManager;
    constructor(arbolesManager: ArbolesService);
    getArbol(arbolId: string): Promise<Arbol>;
    getArboles(): Promise<Arbol[]>;
    crearArbol(arbol: ArbolDTO): Promise<string>;
    modificarArbol(arbol: ArbolDTO, arbolId: string): string;
    eliminarArbol(idArbol: string): string;
}
