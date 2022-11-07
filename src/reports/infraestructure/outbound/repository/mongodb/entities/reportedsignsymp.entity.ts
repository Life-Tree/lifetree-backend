import { ObjectId } from "mongodb";
import { ImageSet } from "src/reports/core/domain/imageset";

export class ReportedSignSymptomsEntity {
    public imageSet: ImageSet;
    public signSymptom: ObjectId;

}