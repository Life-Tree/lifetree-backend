import { Injectable } from '@nestjs/common';
import { IVisionService } from './interfaces/visionService.interface';
import { VISION_SERVICE } from './constantes/serviceVision.enum';
import { GoogleVision } from './implementaciones/googleVision';

@Injectable()
export class VisionServiceFactoryService {
    public getVisionService(serviceVisionType: string ): IVisionService {
        if (serviceVisionType == null) {
            return null;
        }
        if (serviceVisionType === VISION_SERVICE.GOOGLE_VISION) {
            return new GoogleVision();

        }
        return null;
    }
}
