import {Image} from '../domain/image'

export class ImageSet {
    images: Image[];

    constructor(){
        this.images = [];
    }

    public getImages(): Image[] {
        return this.images;
    }

    public addImage(image: Image): void {
        this.images.push(image);
    }

    public setImages(images: Image[]):void {
        this.images = images;
    }

}