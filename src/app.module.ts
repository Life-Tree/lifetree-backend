import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import configuration from './config/environment/configuration';
import { StorageServiceModule } from './models/storage-Service/storageService.module';
import { ControllerModule } from './controllers/controller.module';
import { VisionServiceModule } from './models/vision-Service/vision-service.module';
import { ArbolesModule } from './models/arboles/arboles.module';
import { PersistenciaModule } from './models/persistencia/persistencia.module';
import { PedagogiaModule } from './models/pedagogia/pedagogia.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    //Configuracion de las variables de entorno del servidor
    ConfigModule.forRoot({
      load: [
          configuration,
        ]
    }),
    StorageServiceModule,
    ControllerModule,
    VisionServiceModule,
    ArbolesModule,
    PersistenciaModule,
    PedagogiaModule,
    UsersModule
  ],
  providers: [],
})
export class AppModule {
  
}

