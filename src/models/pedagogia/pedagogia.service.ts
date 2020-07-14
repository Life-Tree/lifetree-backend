import { Injectable } from '@nestjs/common';
import { MaterialPedagogico } from './clases/material-pedagogico';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { CrudType } from '../persistencia/constantes/consts';

@Injectable()
export class PedagogiaService {

    constructor(private persistencia: PersistenciaService<MaterialPedagogico>){

    }

    public async nuevoMP(titulo: string, descripcion: string, dataURL: string): Promise<boolean>{
        let nuevoMP = new MaterialPedagogico(titulo,descripcion,dataURL);
        return await this.persistencia.saveOne(nuevoMP, CrudType.MONGODB, 'instructivos');
    }

    public async getMPs(): Promise<MaterialPedagogico[]>{        
        return await this.persistencia.getAll(CrudType.MONGODB, "instructivos");
    }

    public async getMP(id: string): Promise<MaterialPedagogico>{
        return await this.persistencia.getOne(id, CrudType.MONGODB, "instructivos");
    }

    public async updateMP(id: string, titulo: string, descripcion: string, dataURL: string): Promise<boolean>{        
        let nuevoMP = new MaterialPedagogico(titulo,descripcion,dataURL);
        return await this.persistencia.updateOne(id,nuevoMP,CrudType.MONGODB, "instructivos");
    }

    public async deleteMP(id: string): Promise<boolean>{
        return await this.persistencia.deleteOne(id, CrudType.MONGODB, "instructivos");
    }


}
