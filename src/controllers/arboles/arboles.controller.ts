import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArbolDTO } from "./arbol.dto";
import { ArbolesService } from '../../models/arboles/arboles.service';
import { Arbol } from '../../models/arboles/clases/arbol';

@Controller('arboles')
export class ArbolesController {

    constructor(private arbolesManager: ArbolesService){

    }

    @Get('/:idArbol')
    getArbol(@Param('idArbol') arbolId: string): Promise<Arbol>{
        return this.arbolesManager.getArbol(arbolId);
    }

    @Get()
    getArboles(): Promise<Arbol[]>{
        return this.arbolesManager.getArboles();
    }    

    @Post()
    crearArbol(@Body() arbol: ArbolDTO): string{
        let result = this.arbolesManager.nuevoArbol(arbol.descripcion,arbol.imagenData,arbol.latitud,arbol.longitud, arbol.barrio);
        console.log(arbol);        
        return "Arbol Creado? "+ result;
    }

    @Put(':idArbol')
    modificarArbol(@Body() arbol: ArbolDTO, @Param('idArbol') arbolId: string): string{
        let result = this.arbolesManager.updateArbol(arbolId, arbol.descripcion,arbol.imagenData,arbol.latitud,arbol.longitud, arbol.barrio);        
        console.log(arbol);        
        return "Arbol Actualizado? "+result;    

    }

    @Delete(':idArbol')
    eliminarArbol(@Param('idArbol') idArbol: string): string{
        let result = this.arbolesManager.deleteArbol(idArbol);
        return "Arbol eliminado?: "+ result;
    }
}
