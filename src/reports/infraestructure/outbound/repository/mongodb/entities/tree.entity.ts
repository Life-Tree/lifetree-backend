import { ObjectId } from "mongodb";
import { ImageSet } from "src/reports/core/domain/imageset";
import { Location } from "src/reports/core/domain/location";
import { DiagnosisEntity } from "./diagnosis.entity";
import { ReportedSignSymptomsEntity } from "./reportedsignsymp.entity";

export class TreeEntity {
    public _id: ObjectId;
    public height: number;
    public dch: number;
    public cupDiameter: number;
    public numForks: number;
    public imageSet: ImageSet;
    public location: Location;
    public healthStatus: HealthStatusEntity;
    public specie: ObjectId;
}

export class HealthStatusEntity {
    public status: number;
    public reportedSignSymptoms: ReportedSignSymptomsEntity[];
    public diagnosis: DiagnosisEntity;
}