"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedagogiaModule = void 0;
const common_1 = require("@nestjs/common");
const pedagogia_service_1 = require("./pedagogia.service");
const persistencia_module_1 = require("../persistencia/persistencia.module");
const persistencia_service_1 = require("../persistencia/persistencia.service");
const crud_factory_1 = require("../persistencia/crud.factory");
let PedagogiaModule = class PedagogiaModule {
};
PedagogiaModule = __decorate([
    common_1.Module({
        imports: [persistencia_module_1.PersistenciaModule],
        providers: [pedagogia_service_1.PedagogiaService, persistencia_service_1.PersistenciaService, crud_factory_1.CrudFactory],
        exports: [pedagogia_service_1.PedagogiaService]
    })
], PedagogiaModule);
exports.PedagogiaModule = PedagogiaModule;
//# sourceMappingURL=pedagogia.module.js.map