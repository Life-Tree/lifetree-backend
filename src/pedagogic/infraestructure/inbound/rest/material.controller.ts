import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Material } from "src/pedagogic/core/domain/material";
import { IMaterialService } from "src/pedagogic/core/ports/inbounding/material.service";
import { PermissionName } from "src/users/core/enums/enums";
import { JwtAuthGuard } from "src/users/infraestructure/inbound/middleware/authentication/jwt.guard";
import { RequirePermissions } from "src/users/infraestructure/inbound/middleware/authorization/authorizer.decorator";
import { PermissionGuard } from "src/users/infraestructure/inbound/middleware/authorization/authorizer.guard";
import { MaterialDto, MaterialDtoMapper } from "../dtos/material.dto";

@Controller('materials')
export class MaterialController {
    constructor(
        @Inject('MaterialServiceImpl')
        private materialService: IMaterialService,
        private materialDtoMapper: MaterialDtoMapper){

    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.MATERIAL_READ)
    @Get('/bytitle/:title')
    async getMaterialByTittle(@Param('title') title: string): Promise<Material> {
        return this.materialService.getMaterialByTitle(title);
    }  

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.MATERIAL_READ)
    @Get('/:idMaterial')
    async getMaterial(@Param('idMaterial') idMaterial: string): Promise<Material> {
        return this.materialService.getMaterialById(idMaterial);
    }    

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.MATERIAL_READ)
    @Get()
    async getMaterials(): Promise<Material[]>{
        return this.materialService.getAll();
    } 

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.MATERIAL_CREATE)
    @Post()
    async saveMaterial(@Body() materialDto: MaterialDto): Promise<Material> {
        return this.materialService.saveMaterial(this.materialDtoMapper.dtoToDomain(materialDto));
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.MATERIAL_CREATE)
    @Put()
    async editReport(@Body() materialDto: MaterialDto): Promise<Material> {
        return this.materialService.updateMaterial(this.materialDtoMapper.dtoToDomain(materialDto));
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.MATERIAL_CREATE)
    @Delete(':idMaterial')
    eliminarArbol(@Param('idMaterial') idMaterial: string): string{
        // TODO delete report
        return "TODO";
    }
}