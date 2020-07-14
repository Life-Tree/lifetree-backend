import { Controller, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { PedagogiaService } from 'src/models/pedagogia/pedagogia.service';
import { MaterialPedagogico } from 'src/models/pedagogia/clases/material-pedagogico';
import { PedagogiaDTO } from './pedagogia.dto';

@Controller('pedagogia')
export class PedagogiaController {

    constructor(private pedagogiaManager: PedagogiaService){

    }

    @Get('/:idMP')
    getArbol(@Param('idMP') idMP: string): Promise<MaterialPedagogico>{
        return this.pedagogiaManager.getMP(idMP);
    }

    @Get()
    getArboles(): Promise<MaterialPedagogico[]>{
        return this.pedagogiaManager.getMPs();
    }    

    @Post()
    async crearArbol(@Body() mPedagogico: PedagogiaDTO): Promise<boolean>{
        let result = await this.pedagogiaManager.nuevoMP(mPedagogico.titulo,mPedagogico.descripcion,mPedagogico.dataURL);
        return result;
    }

    @Put(':idMP')
    modificarArbol(@Body() mPedagogico: PedagogiaDTO, @Param('idMP') idMP: string): string{
        let result = this.pedagogiaManager.updateMP(idMP,mPedagogico.titulo,mPedagogico.descripcion,mPedagogico.dataURL);        
        return `Material Pedagógico actualizado?: ${result}`;
    }

    @Delete(':idMP')
    eliminarArbol(@Param('idMP') idMP: string): string{
        let result = this.pedagogiaManager.deleteMP(idMP);
        return `Material Pedagógico eliminado?: ${result}`;
    }


}
