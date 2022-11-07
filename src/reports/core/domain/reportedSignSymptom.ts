import { ImageSet } from "./imageset";
import { SignSymptom } from "./signsymptom";
import {Image} from '../domain/image'

export class ReportedSignSymptom {
    private imageSet: ImageSet;
    private signSymptom: SignSymptom;

    constructor(imageSet: ImageSet, signSymptom: SignSymptom) {
        this.imageSet=imageSet;
        this.signSymptom=signSymptom;
    }

    public getImageSet(): ImageSet {
        return this.imageSet;
    }

    public setImageSet(imageSet: ImageSet): void {
        this.imageSet = imageSet;
    }

    public addImage(image: Image): void {
        this.imageSet.addImage(image);
    }

    public getSignSymptom(): SignSymptom {
        return this.signSymptom;
    }

    public setSignSymptom(signSymptom: SignSymptom): void {
        this.signSymptom = signSymptom;
    }

}