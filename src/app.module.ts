import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import configuration from './config/environment/configuration';
import { StorageServiceModule } from './models/apis-services/Storage-Service/storageService.module';
import { ControllerModule } from './controllers/controller.module';
import { VisionServiceModule } from './models/apis-services/vision-Service/vision-service.module';

@Module({
  imports: [
    //Configuracion de las variables de entorno del servidor
    ConfigModule.forRoot({
      load: [
          configuration,
        ]
    }),
    //Configuracion del driver de conexion de la base de datos
    //MongooseModule.forRoot(host.database().mongodb),
    StorageServiceModule,
    ControllerModule,
    VisionServiceModule
  ],
})
export class AppModule {
  
}

