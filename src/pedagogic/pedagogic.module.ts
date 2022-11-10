import { Module } from '@nestjs/common';
import { MaterialDtoMapper } from './infraestructure/inbound/dtos/material.dto';
import { MaterialController } from './infraestructure/inbound/rest/material.controller';
import { MaterialEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/material.entity';
import { MongoMaterialRepository } from './infraestructure/outbound/repository/mongodb/mongo.material.repo';
import { CloudinaryStorage } from './infraestructure/outbound/storage/cloudinary.storage';
import { GoogleStorage } from './infraestructure/outbound/storage/google.storage';
import { MaterialServiceImpl } from './usecases/material.service.impl';


@Module({
    providers: [
        MaterialEntityMapper,
        MongoMaterialRepository,
        GoogleStorage,
        CloudinaryStorage,
        MaterialServiceImpl,
        MaterialDtoMapper
    ],
    controllers: [MaterialController]
})
export class PedagogicModule {}