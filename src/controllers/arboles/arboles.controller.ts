import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArbolDTO } from "./arbol.dto";
import { ArbolesService } from '../../models/arboles/arboles.service';
import { Arbol } from '../../models/arboles/clases/arbol';
import { Intervencion } from 'src/models/arboles/clases/intervencion';

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
    async crearArbol(@Body() arbol: ArbolDTO): Promise<string>{        
        let result = await this.arbolesManager.nuevoArbol(arbol.descripcion,arbol.imagenData,arbol.ubicacion.latitud,arbol.ubicacion.longitud, arbol.ubicacion.barrio);
        return result; 
    }

    @Put('/intervencion/:idArbol')
    addIntervencion(@Body() arbol: ArbolDTO, @Param('idArbol') arbolId: string): string{
        let intervenciones: Intervencion[] = [];
        for (const inter of arbol.intervenciones) {
            let intervencion = new Intervencion(inter.imagenData, inter.descripcion, inter.estado);
            intervenciones.push(intervencion);
        }
        let result = this.arbolesManager.updateArbol(arbolId, arbol.descripcion,arbol.imagenData,arbol.ubicacion.latitud,
            arbol.ubicacion.longitud, arbol.ubicacion.barrio,arbol.estado,intervenciones,"ADD_INTERVENCION");        
                
        return "Arbol Actualizado? "+ result;
    }

    @Put(':idArbol')
    modificarArbol(@Body() arbol: ArbolDTO, @Param('idArbol') arbolId: string): string{
        let intervenciones: Intervencion[] = [];
        for (const inter of arbol.intervenciones) {
            let intervencion = new Intervencion(inter.imagenData, inter.descripcion, inter.estado);
            intervenciones.push(intervencion);
        }
        let result = this.arbolesManager.updateArbol(arbolId, arbol.descripcion,arbol.imagenData,arbol.ubicacion.latitud,
            arbol.ubicacion.longitud, arbol.ubicacion.barrio, arbol.estado,intervenciones, "OTRO");        
                
        return "Arbol Actualizado? "+ result;
    }

    

    @Delete(':idArbol')
    eliminarArbol(@Param('idArbol') idArbol: string): string{
        let result = this.arbolesManager.deleteArbol(idArbol);
        return "Arbol eliminado?: "+ result;
    }
}
