import vision from '@google-cloud/vision';
import { Injectable } from '@nestjs/common';
import { IVision } from "src/reports/core/ports/outbounding/vision";

@Injectable()
export class GoogleVision implements IVision {
    async isTree(img: string) : Promise<boolean>{
        let tree = false;
        // create api client
        const client = new vision.ImageAnnotatorClient({
            keyFilename: 'APIKEY_GOOGLE.json'
        });
        // return image tags results
        const [result] = await client.labelDetection({
            image: {
                content: img,
            }
        });
        // analize if images contains trees
        const labels = result.labelAnnotations;
        labels.forEach(label => {
            if (label.description === 'Tree' && label.score > 0.79) {
                tree = true;
            }
        });
        return tree;
    }
}