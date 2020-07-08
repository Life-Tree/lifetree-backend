import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { ApiServiceModule } from 'src/models/apis_services/apiService.module';

@Module({
  imports: [
    ApiServiceModule
  ],
  controllers: [
    StorageController
  ]
})
export class ControllerModule {}
