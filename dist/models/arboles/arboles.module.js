"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbolesModule = void 0;
const common_1 = require("@nestjs/common");
const arboles_service_1 = require("./arboles.service");
const persistencia_module_1 = require("../persistencia/persistencia.module");
const persistencia_service_1 = require("../persistencia/persistencia.service");
const crud_factory_1 = require("../persistencia/crud.factory");
const storageService_module_1 = require("../storage-Service/storageService.module");
const vision_service_module_1 = require("../vision-Service/vision-service.module");
const storageServiceFactory_service_1 = require("../storage-Service/storageServiceFactory.service");
const visionServiceFactory_service_1 = require("../vision-Service/visionServiceFactory.service");
let ArbolesModule = class ArbolesModule {
};
ArbolesModule = __decorate([
    common_1.Module({
        imports: [persistencia_module_1.PersistenciaModule, storageService_module_1.StorageServiceModule, vision_service_module_1.VisionServiceModule],
        providers: [arboles_service_1.ArbolesService, persistencia_service_1.PersistenciaService, crud_factory_1.CrudFactory, storageServiceFactory_service_1.StorageServiceFactoryService, visionServiceFactory_service_1.VisionServiceFactoryService],
        exports: [arboles_service_1.ArbolesService]
    })
], ArbolesModule);
exports.ArbolesModule = ArbolesModule;
//# sourceMappingURL=arboles.module.js.map