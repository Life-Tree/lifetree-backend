import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { MongoClient, Db } from 'mongodb';
import * as host from './config/database/databaseConnection'
import { update } from './config/database/updater';
import { ValidationPipe } from '@nestjs/common';
export let client: MongoClient;
export let db: Db;

// Servicio para el acceso de las variables de entorno
const config: ConfigService = new ConfigService();
async function bootstrap() {
  client = await MongoClient.connect(host.database().mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(config.get<string>('mongodb.name'));
  const app = await NestFactory.create(AppModule);
  app.use(json({limit: '10mb'}))
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.enableCors()
  await update();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
