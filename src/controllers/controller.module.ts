import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageServiceModule } from 'src/models/apis-services/Storage-Service/storageService.module';
import { VisionServiceModule } from 'src/models/apis-services/vision-Service/vision-service.module';

@Module({
  imports: [
    StorageServiceModule,
    VisionServiceModule
  ],
  controllers: [
    StorageController
  ]
})
export class ControllerModule {}
