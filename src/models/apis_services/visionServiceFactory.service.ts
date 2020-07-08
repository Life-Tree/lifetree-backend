import { Injectable } from '@nestjs/common';
import { IVisionService } from './visionService.interface';
import { SERVICE } from './service.enum';
import { GoogleVision } from './googleVision';

@Injectable()
export class VisionServiceFactoryService {
    public getVisionService(serviceVisionType: string ): IVisionService {
        if (serviceVisionType == null) {
            return null;
        }
        if (serviceVisionType === SERVICE.GOOGLE) {
            return new GoogleVision();

        }
        return null;
    }
}
