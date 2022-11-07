import { ObjectId } from "mongodb";

export class ReportEntity {
    public _id?: ObjectId;
    public code: string;
    public reportedBy: string;
    public reportedTreeId: ObjectId;

    constructor(code: string, reportedBy: string, treeId: ObjectId) {
        this.code=code;
        this.reportedBy=reportedBy;
        this.reportedTreeId=treeId;
    }
}