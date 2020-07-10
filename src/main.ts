import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { MongoClient, Db } from 'mongodb';

export let client: MongoClient;
export let db: Db;

// Servicio para el acceso de las variables de entorno
//const config: ConfigService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(json({limit: '10mb'}))
  //app.enableCors()
  //await app.listen(config.get<number>('port'));
  client = await MongoClient.connect('mongodb://localhost:27017');
  db = client.db('life');
  await app.listen(3000);
}
bootstrap();
