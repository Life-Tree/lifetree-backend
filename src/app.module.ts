import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import configuration from './config/environment/configuration';
import { ReportsModule } from './reports/reports.module';
import { PedagogicModule } from './pedagogic/pedagogic.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    //Configuracion de las variables de entorno del servidor
    ConfigModule.forRoot({
      load: [
          configuration,
        ]
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 587,
        auth: {
          user: '6cfdaa7fb51558',
          pass: '9cae84d5e6b9b1',
        },
      },
      defaults: {
        from: 'ebanoinfomation@gmail.com',
      },
      template: {
        dir: join(__dirname, './config/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UsersModule,
    PedagogicModule,
    ReportsModule
  ],
  providers: [],
})
export class AppModule {
  
}

