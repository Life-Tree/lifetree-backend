import { Report } from "src/reports/core/domain/report";
import { IReportRepository } from "src/reports/core/ports/outbounding/repository/report.repository";

import { Db, Collection, InsertOneWriteOpResult, ObjectId, WriteOpResult, ReplaceWriteOpResult } from "mongodb";
import { db } from "src/main";
import { Injectable } from "@nestjs/common";
import { REPORTS_TABLE_NAME } from "../constants";
import { ReportEntityMapper } from "./entities/report.entity.mapper";
import { ReportEntity } from "./entities/report.entity";

@Injectable()
export class ReportRepository implements IReportRepository {

    private reportsCollection: Collection;
    private db: Db;

    constructor(private entityMapper: ReportEntityMapper){
        this.db = db;
        this.reportsCollection = this.db.collection(REPORTS_TABLE_NAME);
    }

    async findReportById(id: string): Promise<Report> {
        const _id = new ObjectId(id);
        const entity: ReportEntity = await this.reportsCollection.findOne({ "_id": _id });
        return  this.entityMapper.entityToDomain(entity);
    }
    async findReports(): Promise<Report[]> {
        const entities: ReportEntity[] = await this.reportsCollection.find().toArray();
        return this.entityMapper.entitysToDomains(<ReportEntity[]> entities);
    }
    async saveReport(report: Report): Promise<Report> {
        const entity = this.entityMapper.domainToEntity(report)
        const result = await this.reportsCollection.insertOne(entity);
        const _id = result.insertedId;
        const savedEntity: ReportEntity = await this.reportsCollection.findOne({ "_id": _id })
        return this.entityMapper.entityToDomain(savedEntity);
    }
    async updateReport(report: Report): Promise<Report> {
        const _id = new ObjectId(report.getId());
        const entity = this.entityMapper.domainToEntity(report);
        const result: ReplaceWriteOpResult = await this.reportsCollection.replaceOne({ "_id": _id }, entity, { upsert: true });
        const updatedEntity:ReportEntity = await this.reportsCollection.findOne({ "_id": _id })
        return this.entityMapper.entityToDomain(updatedEntity);
    }
    
}