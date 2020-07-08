import { Injectable } from '@nestjs/common';
import { IVisionService } from './visionService.interface';
import { VISION_SERVICE } from '../vision-Service/serviceVision.enum';
import { GoogleVision } from './googleVision';

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
