import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import configuration from './config/environment/configuration';
import { ApiServiceModule } from './models/apis_services/apiService.module';
import { ControllerModule } from './controllers/controller.module';

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
    ApiServiceModule,
    ControllerModule
  ],
})
export class AppModule {
  
}

