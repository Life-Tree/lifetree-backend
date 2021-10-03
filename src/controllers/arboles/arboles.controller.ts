import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArbolDTO } from "./arbol.dto";
import { ArbolesService } from '../../models/arboles/arboles.service';
import { Arbol } from '../../models/arboles/clases/arbol';
import { Species } from 'src/models/arboles/clases/especie';
import { ObjectId } from 'bson';

@Controller('arboles')
export class ArbolesController {

    constructor(private arbolesManager: ArbolesService){

    }

    @Get('species')
    getAllSpecies(): Promise<Species[]>{
        return this.arbolesManager.getAllSpecies();
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
        let species: Species = new Species(arbol.species.name, arbol.species.scientificName, arbol.species.family);
        species.set_Id(new ObjectId(arbol.species._id));
        //let images: Image[] = arbol.imageSet.getAllImages();
        let result = await this.arbolesManager.nuevoArbol(arbol.descripcion,arbol.imageSet,arbol.ubicacion.latitud,arbol.ubicacion.longitud, arbol.ubicacion.barrio, species);
        return result; 
    }

    @Put('/intervencion/:idArbol')
    addIntervencion(@Body() arbol: ArbolDTO, @Param('idArbol') arbolId: string): string{
        let species: Species = new Species(arbol.species.name, arbol.species.scientificName, arbol.species.family);
        species.set_Id(new ObjectId(arbol.species._id));
        let result = this.arbolesManager.updateArbol(arbolId, arbol.descripcion,arbol.imageSet,arbol.ubicacion.latitud,
            arbol.ubicacion.longitud, arbol.ubicacion.barrio,arbol.estado,arbol.intervenciones,"IMAGE_CHANGE", species);        
                
        return "Arbol Actualizado? "+ result;
    }

    @Put(':idArbol')
    modificarArbol(@Body() arbol: ArbolDTO, @Param('idArbol') arbolId: string): string{
        let species: Species = new Species(arbol.species.name, arbol.species.scientificName, arbol.species.family);
        species.set_Id(new ObjectId(arbol.species._id));
        let result = this.arbolesManager.updateArbol(arbolId, arbol.descripcion,arbol.imageSet,arbol.ubicacion.latitud,
            arbol.ubicacion.longitud, arbol.ubicacion.barrio, arbol.estado,arbol.intervenciones, "NO_IMAGE_CHANGE", species);        
                
        return "Arbol Actualizado? "+ result;
    }

    

    @Delete(':idArbol')
    eliminarArbol(@Param('idArbol') idArbol: string): string{
        let result = this.arbolesManager.deleteArbol(idArbol);
        return "Arbol eliminado?: "+ result;
    }
}
