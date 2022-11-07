import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Report } from "src/reports/core/domain/report";
import { ITreeRepository } from "src/reports/core/ports/outbounding/repository/tree.repository";
import { ReportEntity } from "./report.entity";

@Injectable()
export class ReportEntityMapper{
    constructor(
        @Inject('TreeRepository')
        private treeRepo: ITreeRepository){}
        
    public async entityToDomain(entity: ReportEntity): Promise<Report> {
        const treeId: {_id: ObjectId} = entity.reportedTreeId as any
        const treeIdString = treeId._id ? treeId._id.toHexString() : entity.reportedTreeId.toHexString()
        const tree = await this.treeRepo.findTreeById(treeIdString)
        const report = new Report(entity.code,entity.reportedBy,tree)
        report.setId(entity._id.toHexString());
        return report;
    }

    public async entitysToDomains(entities: ReportEntity[]): Promise<Report[]> {
        const reports: Report[] = [];
        for (const entity of entities) {
            const report = await this.entityToDomain(entity);
            reports.push(report);
        }
        return reports;
    }

    public domainToEntity(domain: Report): ReportEntity {
        const treeId: ObjectId = new ObjectId(domain.getReportedTree().getId());
        const entity: ReportEntity = new ReportEntity(domain.getCode(),domain.getReportedBy(),treeId)
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        return entity;
    }
}