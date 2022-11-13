import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import configuration from './config/environment/configuration';
import { ReportsModule } from './reports/reports.module';
import { PedagogicModule } from './pedagogic/pedagogic.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    //Configuracion de las variables de entorno del servidor
    ConfigModule.forRoot({
      load: [
          configuration,
        ]
    }),
    UsersModule,
    PedagogicModule,
    ReportsModule
  ],
  providers: [],
})
export class AppModule {
  
}

