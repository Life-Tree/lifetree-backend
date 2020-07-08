import { IVisionService } from "./visionService.interface";
import vision from '@google-cloud/vision';


export class GoogleVision implements IVisionService {
    async isTree(img: string) : Promise<boolean>{
        let tree = false;
        // crea cliente de la api de vision
        const client = new vision.ImageAnnotatorClient({
            keyFilename: 'APIKEY_GOOGLE.json'
        });
        // retprna los resultados de las etiquetas de las imagenes
        const [result] = await client.labelDetection({
            image: {
                content: img,
            }
        });
        // analisa si la imagen contiene arboles
        const labels = result.labelAnnotations;
        labels.forEach(label => {
            if (label.description === 'Tree' && label.score > 0.79) {
                tree = true;
            }
        });
        return tree;
    }
}