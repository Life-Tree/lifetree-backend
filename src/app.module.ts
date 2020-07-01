import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import configuration from './config/environment/configuration';
import * as host from './config/database/databaseConnection';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    //Configuracion de las variables de entorno del servidor
    ConfigModule.forRoot({
      load: [
          configuration,
        ]
    }),
    //Configuracion del driver de conexion de la base de datos
    MongooseModule.forRoot(host.database().mongodb)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}

