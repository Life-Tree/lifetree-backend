"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageServiceFactoryService = void 0;
const common_1 = require("@nestjs/common");
const goolgeStorage_1 = require("./implementaciones/goolgeStorage");
const serviceStorage_enum_1 = require("./constantes/serviceStorage.enum");
let StorageServiceFactoryService = class StorageServiceFactoryService {
    getSorageService(serviceStorageType) {
        if (serviceStorageType == null) {
            return null;
        }
        if (serviceStorageType === serviceStorage_enum_1.STORAGE_SERVICE.GOOGLE_STORAGE) {
            return new goolgeStorage_1.GoogleStorage();
        }
        return null;
    }
};
StorageServiceFactoryService = __decorate([
    common_1.Injectable()
], StorageServiceFactoryService);
exports.StorageServiceFactoryService = StorageServiceFactoryService;
//# sourceMappingURL=storageServiceFactory.service.js.map