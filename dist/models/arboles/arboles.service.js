"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbolesService = void 0;
const common_1 = require("@nestjs/common");
const arbol_1 = require("./clases/arbol");
const ubicacion_1 = require("./clases/ubicacion");
const persistencia_service_1 = require("../persistencia/persistencia.service");
const visionServiceFactory_service_1 = require("../vision-Service/visionServiceFactory.service");
const storageServiceFactory_service_1 = require("../storage-Service/storageServiceFactory.service");
const serviceVision_enum_1 = require("../vision-Service/constantes/serviceVision.enum");
const serviceStorage_enum_1 = require("../storage-Service/constantes/serviceStorage.enum");
const enums_1 = require("./enums/enums");
let ArbolesService = class ArbolesService {
    constructor(persistencia, storageServiceFactory, visionServiceFactory) {
        this.persistencia = persistencia;
        this.storageServiceFactory = storageServiceFactory;
        this.visionServiceFactory = visionServiceFactory;
    }
    async nuevoArbol(descripcion, img, lat, lon, barrio) {
        let ubicacion = new ubicacion_1.Ubicacion(lat, lon, barrio);
        let nuevoArbol = new arbol_1.Arbol(descripcion, img, ubicacion);
        const visionService = this.visionServiceFactory.getVisionService(serviceVision_enum_1.VISION_SERVICE.GOOGLE_VISION);
        let esArbol = await visionService.isTree(img);
        console.log(esArbol);
        if (esArbol) {
            const storageService = this.storageServiceFactory.getSorageService(serviceStorage_enum_1.STORAGE_SERVICE.GOOGLE_STORAGE);
            let imagenURL = await storageService.uploadFile(img);
            nuevoArbol.setImagenURL(imagenURL);
            let guardado = await this.persistencia.saveOne(nuevoArbol, 0, "arboles");
            return guardado ? enums_1.ResultMesagge.EXITO : enums_1.ResultMesagge.PROBLEMA_EN_BASE_DE_DATOS;
        }
        else {
            return enums_1.ResultMesagge.NO_ES_ARBOL;
        }
    }
    async getArboles() {
        return await this.persistencia.getAll(0, "arboles");
    }
    async getArbol(id) {
        return await this.persistencia.getOne(id, 0, "arboles");
    }
    async updateArbol(id, descripcion, img, lat, lon, barrio) {
        let ubicacion = new ubicacion_1.Ubicacion(lat, lon, barrio);
        let nuevoArbol = new arbol_1.Arbol(descripcion, img, ubicacion);
        return await this.persistencia.updateOne(id, nuevoArbol, 0, "arboles");
    }
    async deleteArbol(id) {
        return await this.persistencia.deleteOne(id, 0, "arboles");
    }
};
ArbolesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [persistencia_service_1.PersistenciaService,
        storageServiceFactory_service_1.StorageServiceFactoryService,
        visionServiceFactory_service_1.VisionServiceFactoryService])
], ArbolesService);
exports.ArbolesService = ArbolesService;
//# sourceMappingURL=arboles.service.js.map