import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, ValidationPipe } from "@nestjs/common";
import { ValidateNested } from "class-validator";
import { Condition } from "src/reports/core/domain/condition";
import { Report } from "src/reports/core/domain/report";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { Specie } from "src/reports/core/domain/specie";
import { TreePart } from "src/reports/core/enums/enums";
import { IReporter } from "src/reports/core/ports/inbounding/reporter";
import { IReportFinder } from "src/reports/core/ports/inbounding/reportFinder";
import { ReportDto, ReportDtoMapper } from "../dtos/report.dto";

@Controller('reports')
export class ReportController {
    constructor(
        @Inject('BasicReporter')
        private reporter: IReporter,
        @Inject('ReportFinderImpl')
        private reportFinder: IReportFinder,
        private reportDtoMapper: ReportDtoMapper){

    }

    @Get('species')
    async getAllSpecies(): Promise<Specie[]>{
        return this.reportFinder.getAllSpecies();
    }

    @Get('conditions')
    async getAllConditions(): Promise<Condition[]>{
        return this.reportFinder.getAllConditions();
    }

    @Get('signsymptoms/byparts/:parts')
    async getSignSymptomsByTreeParts(@Param('parts') parts: string): Promise<SignSymptom[]>{
        const treePartsArray: string[] = parts.split(',');
        const treeParts: TreePart[] = [];
        if(treePartsArray.length > 0){
            treePartsArray.forEach(part => {
                treeParts.push(Number(part));
            });

        }
        return this.reportFinder.getSignSymptomsByTreeParts(treeParts);
    }

    @Get('/:idReport')
    async getReport(@Param('idReport') idReport: string): Promise<Report> {
        return this.reportFinder.getReportById(idReport);
    }    

    @Get()
    async getReports(): Promise<Report[]>{
        return this.reportFinder.listReports();
    } 

    @Post()
    async createReport(@Body() report: ReportDto): Promise<Report> {
        return this.reporter.report(this.reportDtoMapper.dtoToDomain(report));
    }

    @Put(':idReport')
    editReport(@Body() report: Report, @Param('idReport') idReport: string): Report{
        // TODO edit report
        return null;
    }

    
    @Delete(':idReport')
    eliminarArbol(@Param('idReport') idReport: string): string{
        // TODO delete report
        return "";
    }
}