import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { Condition } from "src/reports/core/domain/condition";
import { Report } from "src/reports/core/domain/report";
import { SignSymptom } from "src/reports/core/domain/signsymptom";
import { Specie } from "src/reports/core/domain/specie";
import { TreePart } from "src/reports/core/enums/enums";
import { IReporter } from "src/reports/core/ports/inbounding/reporter";
import { IReportFinder } from "src/reports/core/ports/inbounding/reportFinder";
import { PermissionName } from "src/users/core/enums/enums";
import { JwtAuthGuard } from "src/users/infraestructure/inbound/middleware/authentication/jwt.guard";
import { JwtWithUserAuthGuard } from "src/users/infraestructure/inbound/middleware/authentication/jwt.with.user.guard";
import { RequirePermissions } from "src/users/infraestructure/inbound/middleware/authorization/authorizer.decorator";
import { PermissionGuard } from "src/users/infraestructure/inbound/middleware/authorization/authorizer.guard";
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

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_READ)
    @Get('species')
    async getAllSpecies(): Promise<Specie[]>{
        return this.reportFinder.getAllSpecies();
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_READ)
    @Get('conditions')
    async getAllConditions(): Promise<Condition[]>{
        return this.reportFinder.getAllConditions();
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_READ)
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

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_READ)
    @Get('/:idReport')
    async getReport(@Param('idReport') idReport: string): Promise<Report> {
        return this.reportFinder.getReportById(idReport);
    }    

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_READ)
    @Get()
    async getReports(): Promise<Report[]>{
        return this.reportFinder.listReports();
    } 

    @UseGuards(JwtWithUserAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_CREATE)
    @Post()
    async createReport(@Request() req, @Body() report: ReportDto): Promise<Report> {
        report.reportedBy = req?.user?.userId;
        const user = req.user;
        return this.reporter.report(this.reportDtoMapper.dtoToDomain(report), user);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_CREATE)
    @Put(':idReport')
    editReport(@Body() report: Report, @Param('idReport') idReport: string): Report{
        // TODO edit report
        return null;
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(PermissionName.REPORT_CREATE)
    @Delete(':idReport')
    eliminarArbol(@Param('idReport') idReport: string): string{
        // TODO delete report
        return "";
    }
}