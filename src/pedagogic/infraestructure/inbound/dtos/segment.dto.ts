import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { File } from "src/pedagogic/core/domain/file";

export class SegmentDto{
    public code: string;
    public consecutive: number;
    public description: string;
    
    @ValidateNested()
    @Type(() => File)
    public file: File;
    public name: string;
    public text: string;
}