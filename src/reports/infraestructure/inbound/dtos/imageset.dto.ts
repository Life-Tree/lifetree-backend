import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Image } from "src/reports/core/domain/image";

export class ImageSetDto{
    @ValidateNested({ each: true })
    @Type(() => Image)
    images: Image[];
}