import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { Admin } from 'src/models/users/clases/admin';
import { AdminDTO } from './adminDTO';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){

    }

    @Post("/valid")
    async validarAdmin(@Body() nuevoAdmin: AdminDTO): Promise<Admin>{
        let result = await this.usersService.validarAdmin(nuevoAdmin.nickname,nuevoAdmin.password);
        return result;
    }

    @Get(':idAdmin')
    getAdmin(@Param('idAdmin') idAdmin: string): Promise<Admin>{
        return this.usersService.getAdmin(idAdmin);
    }

    @Get()
    getAdmins(): Promise<Admin[]>{
        return this.usersService.getAdmins();
    }    

    @Post()
    async crearAdmin(@Body() nuevoAdmin: AdminDTO): Promise<boolean>{
        let result = await this.usersService.nuevoAdmin(nuevoAdmin.nickname,nuevoAdmin.password);
        return result;
    }

    

    @Put(':idAdmin')
    modificarAdmin(@Body() admin: AdminDTO, @Param('idAdmin') idAdmin: string): string{
        let result = this.usersService.updateAdmin(idAdmin, admin.nickname, admin.password);        
        return `Admin actualizado?: ${result}`;
    }

    @Delete(':idAdmin')
    eliminarAdmin(@Param('idAdmin') idAdmin: string): string{
        let result = this.usersService.deleteAdmin(idAdmin);
        return `Admin  eliminado?: ${result}`;
    }


}
