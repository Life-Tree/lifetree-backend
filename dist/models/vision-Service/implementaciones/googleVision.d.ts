import { IVisionService } from "../interfaces/visionService.interface";
export declare class GoogleVision implements IVisionService {
    isTree(img: string): Promise<boolean>;
}
