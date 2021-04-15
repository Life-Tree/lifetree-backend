import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { MongoClient, Db } from 'mongodb';
import * as host from './config/database/databaseConnection'
export let client: MongoClient;
export let db: Db;

// Servicio para el acceso de las variables de entorno
const config: ConfigService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({limit: '10mb'}))
  app.enableCors()

  //client = await MongoClient.connect(host.database().mongodb);
  client = await MongoClient.connect(`mongodb+srv://tree:LifeTreeV2@dblifetree-pn1er.gcp.mongodb.net/dblifetree?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(config.get<string>('mongodb.name'));
  //app.listen(config.get<number>('port'));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
