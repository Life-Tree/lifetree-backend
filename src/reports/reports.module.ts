import { Module } from '@nestjs/common';
import { BasicReporter } from './usecases/basic.reporter';
import { ReportFinderImpl } from './usecases/reportFinder';
import { ReportRepository } from './infraestructure/outbound/repository/mongodb/report.repository';
import { ReportEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/report.entity.mapper';
import { SpeciesRepository } from './infraestructure/outbound/repository/mongodb/specie.repository';
import { SpecieEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/specie.entity.mapper';
import { ConditionsRepository } from './infraestructure/outbound/repository/mongodb/condition.repository';
import { ConditionEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/condition.entity.mapper';
import { SignSymptomRepository } from './infraestructure/outbound/repository/mongodb/signsymptom.repository';
import { SignSymptomEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/signsymptom.entity.mapper';
import { GoogleStorage } from './infraestructure/outbound/storage/google.storage';
import { GoogleVision } from './infraestructure/outbound/vision/google.vision';
import { CloudinaryStorage } from './infraestructure/outbound/storage/cloudinary.storage';
import { BasicDiagnostician } from './infraestructure/outbound/diagnostician/basic.diagnostician';
import { TreeRepository } from './infraestructure/outbound/repository/mongodb/tree.repository';
import { TreeEntityMapper } from './infraestructure/outbound/repository/mongodb/entities/tree.entity.mapper';
import { ReportController } from './infraestructure/inbound/rest/report.controller';
import { ReportDtoMapper } from './infraestructure/inbound/dtos/report.dto';
import { SignSymptomDtoMapper } from './infraestructure/inbound/dtos/sigsymtpom.dto';
import { ConditionDtoMapper } from './infraestructure/inbound/dtos/condition.dto';
import { DiagnosisDtoMapper } from './infraestructure/inbound/dtos/diagnosis.dto';
import { ReportedSignSymptomDtoMapper } from './infraestructure/inbound/dtos/reportedsignsymptom.dto';
import { HealthStatusDtoMapper } from './infraestructure/inbound/dtos/healthstatus.dto';
import { TreeDtoMapper } from './infraestructure/inbound/dtos/tree.dto';

@Module({
    providers: [
        SpecieEntityMapper, 
        SignSymptomEntityMapper,
        SignSymptomRepository,
        SpeciesRepository,
        ConditionEntityMapper,
        ConditionsRepository,         
        TreeEntityMapper,
        TreeRepository,
        ReportEntityMapper,  
        ReportRepository,               
        ReportFinderImpl,
        GoogleVision,
        GoogleStorage,
        CloudinaryStorage,
        BasicDiagnostician,
        BasicReporter,
        SignSymptomDtoMapper,
        ConditionDtoMapper,
        DiagnosisDtoMapper,
        ReportedSignSymptomDtoMapper,
        HealthStatusDtoMapper,
        TreeDtoMapper,
        ReportDtoMapper,
    ],
    controllers: [ReportController]
})
export class ReportsModule {}