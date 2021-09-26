import { Frame } from "../enums/enums";
import {Image} from './image';

export class ImageSet{

    public images: Image[];

    constructor(images?: Image[]){
        if(images){
            this.images = images;
        }else{
            this.images = [];
        }        
    }

    public getImagesByFrame(frame: Frame): Image[] {
        let images = this.images.filter((img) => {
            return img.frame == frame;
        });
        return images;
    }

    public getAllImages(): Image[] {
        return this.images;
    }

    public addImage(image: Image): void {
        this.images.push(image);
    }

    public setImages(images: Image[]): void {
        this.images = images;
    }
}

