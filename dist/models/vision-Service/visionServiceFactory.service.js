"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisionServiceFactoryService = void 0;
const common_1 = require("@nestjs/common");
const serviceVision_enum_1 = require("./constantes/serviceVision.enum");
const googleVision_1 = require("./implementaciones/googleVision");
let VisionServiceFactoryService = class VisionServiceFactoryService {
    getVisionService(serviceVisionType) {
        if (serviceVisionType == null) {
            return null;
        }
        if (serviceVisionType === serviceVision_enum_1.VISION_SERVICE.GOOGLE_VISION) {
            return new googleVision_1.GoogleVision();
        }
        return null;
    }
};
VisionServiceFactoryService = __decorate([
    common_1.Injectable()
], VisionServiceFactoryService);
exports.VisionServiceFactoryService = VisionServiceFactoryService;
//# sourceMappingURL=visionServiceFactory.service.js.map