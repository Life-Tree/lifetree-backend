import { Tree } from "./tree";

export class Report {
    private id: string;
    private code: string;
    private reportedBy: string;
    private reportedTree: Tree;

    constructor(code: string, reportedBy: string, reportedTree: Tree) {
        this.code=code;
        this.reportedBy=reportedBy;
        this.reportedTree=reportedTree;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getReportedBy(): string {
        return this.reportedBy;
    }

    public setReportedBy(reportedBy: string): void {
        this.reportedBy = reportedBy;
    }

    public getReportedTree(): Tree {
        return this.reportedTree;
    }

    public setReportedTree(reportedTree: Tree): void {
        this.reportedTree = reportedTree;
    }

}