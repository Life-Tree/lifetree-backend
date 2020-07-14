"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisionServiceModule = void 0;
const common_1 = require("@nestjs/common");
const visionServiceFactory_service_1 = require("./visionServiceFactory.service");
let VisionServiceModule = class VisionServiceModule {
};
VisionServiceModule = __decorate([
    common_1.Module({
        providers: [
            visionServiceFactory_service_1.VisionServiceFactoryService
        ],
        exports: [
            visionServiceFactory_service_1.VisionServiceFactoryService
        ]
    })
], VisionServiceModule);
exports.VisionServiceModule = VisionServiceModule;
//# sourceMappingURL=vision-service.module.js.map