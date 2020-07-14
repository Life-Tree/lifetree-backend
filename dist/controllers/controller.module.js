"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerModule = void 0;
const common_1 = require("@nestjs/common");
const arboles_controller_1 = require("./arboles/arboles.controller");
const arboles_module_1 = require("../models/arboles/arboles.module");
const arboles_service_1 = require("../models/arboles/arboles.service");
const storageServiceFactory_service_1 = require("../models/storage-Service/storageServiceFactory.service");
const visionServiceFactory_service_1 = require("../models/vision-Service/visionServiceFactory.service");
const persistencia_service_1 = require("../models/persistencia/persistencia.service");
const crud_factory_1 = require("../models/persistencia/crud.factory");
const pedagogia_controller_1 = require("./pedagogia/pedagogia.controller");
const pedagogia_module_1 = require("../models/pedagogia/pedagogia.module");
const pedagogia_service_1 = require("../models/pedagogia/pedagogia.service");
let ControllerModule = class ControllerModule {
};
ControllerModule = __decorate([
    common_1.Module({
        imports: [arboles_module_1.ArbolesModule, pedagogia_module_1.PedagogiaModule],
        controllers: [arboles_controller_1.ArbolesController, pedagogia_controller_1.PedagogiaController],
        providers: [arboles_service_1.ArbolesService, storageServiceFactory_service_1.StorageServiceFactoryService,
            visionServiceFactory_service_1.VisionServiceFactoryService, persistencia_service_1.PersistenciaService, crud_factory_1.CrudFactory, pedagogia_service_1.PedagogiaService]
    })
], ControllerModule);
exports.ControllerModule = ControllerModule;
//# sourceMappingURL=controller.module.js.map