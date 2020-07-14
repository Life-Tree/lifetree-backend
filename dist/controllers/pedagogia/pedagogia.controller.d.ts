import { PedagogiaService } from 'src/models/pedagogia/pedagogia.service';
import { MaterialPedagogico } from 'src/models/pedagogia/clases/material-pedagogico';
import { PedagogiaDTO } from './pedagogia.dto';
export declare class PedagogiaController {
    private pedagogiaManager;
    constructor(pedagogiaManager: PedagogiaService);
    getPedagogia(idMP: string): Promise<MaterialPedagogico>;
    getPedagogias(): Promise<MaterialPedagogico[]>;
    crearPedagogia(mPedagogico: PedagogiaDTO): Promise<boolean>;
    modificarPedagogia(mPedagogico: PedagogiaDTO, idMP: string): string;
    eliminarArbol(idMP: string): string;
}
