import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageServiceModule } from 'src/models/storage-Service/storageService.module';
import { VisionServiceModule } from 'src/models/vision-Service/vision-service.module';
import { ArbolesController } from './arboles/arboles.controller';

@Module({
  imports: [
    StorageServiceModule,
    VisionServiceModule
  ],
  controllers: [
    StorageController,
    ArbolesController
  ]
})
export class ControllerModule {}
