import { Injectable } from '@nestjs/common';
import { Admin } from './clases/admin';
import { PersistenciaService } from '../persistencia/persistencia.service';
import { CrudType } from '../persistencia/constantes/consts';
import { TABLA_NAME_ADMIN } from './consts/constantes';
import { MaterialPedagogico } from '../pedagogia/clases/material-pedagogico';

@Injectable()
export class UsersService {

    constructor(private persistenciaService: PersistenciaService<Admin>){

    }

    public async validarAdmin(nickname:string, password:string): Promise<Admin>{
        let result =  await this.persistenciaService.getByParams("nickname",nickname,"password", password, CrudType.MONGODB, TABLA_NAME_ADMIN);
        return result[0];
    }

    public async nuevoAdmin(nickname: string, password: string): Promise<boolean>{
        let nuevoAdmin = new Admin(nickname,password);
        return await this.persistenciaService.saveOne(nuevoAdmin,CrudType.MONGODB, TABLA_NAME_ADMIN);
    }

    public async getAdmins(): Promise<Admin[]>{        
        return await this.persistenciaService.getAll(CrudType.MONGODB, TABLA_NAME_ADMIN);
    }

    public async getAdmin(id: string): Promise<Admin>{
        return await this.persistenciaService.getOne(id, CrudType.MONGODB, TABLA_NAME_ADMIN);
    }

    public async updateAdmin(id: string, nickname: string, password: string): Promise<boolean>{        
        let nuevoAdmin = new Admin(nickname,password);
        return await this.persistenciaService.updateOne(id,nuevoAdmin,CrudType.MONGODB, TABLA_NAME_ADMIN);
    }

    public async deleteAdmin(id: string): Promise<boolean>{
        return await this.persistenciaService.deleteOne(id, CrudType.MONGODB, TABLA_NAME_ADMIN);
    }

}
