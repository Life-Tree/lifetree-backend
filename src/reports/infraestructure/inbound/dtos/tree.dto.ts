import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { ImageSet } from "src/reports/core/domain/imageset";
import { Location } from "src/reports/core/domain/location";
import { Specie } from "src/reports/core/domain/specie";
import { Tree } from "src/reports/core/domain/tree";
import { HealthStatusDto, HealthStatusDtoMapper } from "./healthstatus.dto";
import { ImageSetDto } from "./imageset.dto";

export class TreeDto {
    public id: string;
    public height: number;
    public dch: number; // diameter at chest height (cm)
    public cupDiameter: number; // cup diameter (m)
    public numForks: number; // number of forks
    
    @ValidateNested()
    @Type(() => ImageSetDto)
    public imageSet: ImageSetDto;

    @ValidateNested()
    @Type(() => Location)
    public location: Location;

    @ValidateNested()
    @Type(() => HealthStatusDto)
    public healthStatus: HealthStatusDto;

    @ValidateNested()
    @Type(() => Specie)
    public specie: Specie;
}

@Injectable()
export class TreeDtoMapper {
    constructor(
        private healthStatusMapper: HealthStatusDtoMapper){}
    public dtoToDomain(dto: TreeDto): Tree {
        const tree: Tree = new Tree();
        tree.setDch(dto.dch);
        tree.setCupDiameter(dto.cupDiameter);
        tree.setHeight(dto.height);
        tree.setId(dto.id);
        tree.setLocation(dto.location);
        tree.setNumForks(dto.numForks);
        tree.setSpecie(dto.specie);

        const imageSet: ImageSet = new ImageSet()
        imageSet.setImages(dto?.imageSet?.images ? dto?.imageSet?.images : []);      
        tree.setImageSet(imageSet);
        tree.setHealthStatus(dto.healthStatus ? this.healthStatusMapper.dtoToDomain(dto.healthStatus): null);

        return tree;
    } 

    public dtosToDomains(dtos: TreeDto[]): Tree[]{
        const domains: Tree[] = [];
        dtos.forEach(dto => {
            domains.push(this.dtoToDomain(dto));
        });
        return domains;
    }
}