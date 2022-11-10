import { FileEntity } from "./file.entity";

export class SegmentEntity{
    public code: string;
    public consecutive: number;
    public description: string;
    public file: FileEntity;
    public name: string;
    public text: string;
}