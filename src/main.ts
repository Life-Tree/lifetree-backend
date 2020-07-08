import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';

// Servicio para el acceso de las variables de entorno
const config: ConfigService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({limit: '10mb'}))
  app.enableCors()
  await app.listen(config.get<number>('port'));
}
bootstrap();
