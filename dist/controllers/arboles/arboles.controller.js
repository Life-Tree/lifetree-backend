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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbolesController = void 0;
const common_1 = require("@nestjs/common");
const arbol_dto_1 = require("./arbol.dto");
const arboles_service_1 = require("../../models/arboles/arboles.service");
let ArbolesController = class ArbolesController {
    constructor(arbolesManager) {
        this.arbolesManager = arbolesManager;
    }
    getArbol(arbolId) {
        return this.arbolesManager.getArbol(arbolId);
    }
    getArboles() {
        return this.arbolesManager.getArboles();
    }
    async crearArbol(arbol) {
        let result = await this.arbolesManager.nuevoArbol(arbol.descripcion, arbol.imagenData, arbol.latitud, arbol.longitud, arbol.barrio);
        return result;
    }
    modificarArbol(arbol, arbolId) {
        let result = this.arbolesManager.updateArbol(arbolId, arbol.descripcion, arbol.imagenData, arbol.latitud, arbol.longitud, arbol.barrio);
        console.log(arbol);
        return "Arbol Actualizado? " + result;
    }
    eliminarArbol(idArbol) {
        let result = this.arbolesManager.deleteArbol(idArbol);
        return "Arbol eliminado?: " + result;
    }
};
__decorate([
    common_1.Get('/:idArbol'),
    __param(0, common_1.Param('idArbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArbolesController.prototype, "getArbol", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArbolesController.prototype, "getArboles", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [arbol_dto_1.ArbolDTO]),
    __metadata("design:returntype", Promise)
], ArbolesController.prototype, "crearArbol", null);
__decorate([
    common_1.Put(':idArbol'),
    __param(0, common_1.Body()), __param(1, common_1.Param('idArbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [arbol_dto_1.ArbolDTO, String]),
    __metadata("design:returntype", String)
], ArbolesController.prototype, "modificarArbol", null);
__decorate([
    common_1.Delete(':idArbol'),
    __param(0, common_1.Param('idArbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], ArbolesController.prototype, "eliminarArbol", null);
ArbolesController = __decorate([
    common_1.Controller('arboles'),
    __metadata("design:paramtypes", [arboles_service_1.ArbolesService])
], ArbolesController);
exports.ArbolesController = ArbolesController;
//# sourceMappingURL=arboles.controller.js.map