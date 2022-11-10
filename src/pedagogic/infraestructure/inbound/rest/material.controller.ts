import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { Material } from "src/pedagogic/core/domain/material";
import { IMaterialService } from "src/pedagogic/core/ports/inbounding/material.service";
import { MaterialDto, MaterialDtoMapper } from "../dtos/material.dto";

@Controller('materials')
export class MaterialController {
    constructor(
        @Inject('MaterialServiceImpl')
        private materialService: IMaterialService,
        private materialDtoMapper: MaterialDtoMapper){

    }

    @Get('/bytitle/:title')
    async getMaterialByTittle(@Param('title') title: string): Promise<Material> {
        return this.materialService.getMaterialByTitle(title);
    }  

    @Get('/:idMaterial')
    async getMaterial(@Param('idMaterial') idMaterial: string): Promise<Material> {
        return this.materialService.getMaterialById(idMaterial);
    }    

    @Get()
    async getMaterials(): Promise<Material[]>{
        return this.materialService.getAll();
    } 

    @Post()
    async saveMaterial(@Body() materialDto: MaterialDto): Promise<Material> {
        return this.materialService.saveMaterial(this.materialDtoMapper.dtoToDomain(materialDto));
    }

    @Put()
    async editReport(@Body() materialDto: MaterialDto): Promise<Material> {
        return this.materialService.updateMaterial(this.materialDtoMapper.dtoToDomain(materialDto));
    }

    
    @Delete(':idMaterial')
    eliminarArbol(@Param('idMaterial') idMaterial: string): string{
        // TODO delete report
        return "TODO";
    }
}