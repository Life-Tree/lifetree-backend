"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenciaModule = void 0;
const common_1 = require("@nestjs/common");
const persistencia_service_1 = require("./persistencia.service");
const crud_factory_1 = require("./crud.factory");
let PersistenciaModule = class PersistenciaModule {
};
PersistenciaModule = __decorate([
    common_1.Module({
        providers: [persistencia_service_1.PersistenciaService, crud_factory_1.CrudFactory],
        exports: [persistencia_service_1.PersistenciaService]
    })
], PersistenciaModule);
exports.PersistenciaModule = PersistenciaModule;
//# sourceMappingURL=persistencia.module.js.map