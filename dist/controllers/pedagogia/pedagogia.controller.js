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
exports.PedagogiaController = void 0;
const common_1 = require("@nestjs/common");
const pedagogia_service_1 = require("../../models/pedagogia/pedagogia.service");
const material_pedagogico_1 = require("../../models/pedagogia/clases/material-pedagogico");
const pedagogia_dto_1 = require("./pedagogia.dto");
let PedagogiaController = class PedagogiaController {
    constructor(pedagogiaManager) {
        this.pedagogiaManager = pedagogiaManager;
    }
    getPedagogia(idMP) {
        return this.pedagogiaManager.getMP(idMP);
    }
    getPedagogias() {
        return this.pedagogiaManager.getMPs();
    }
    async crearPedagogia(mPedagogico) {
        let result = await this.pedagogiaManager.nuevoMP(mPedagogico.titulo, mPedagogico.descripcion, mPedagogico.dataURL);
        return result;
    }
    modificarPedagogia(mPedagogico, idMP) {
        let result = this.pedagogiaManager.updateMP(idMP, mPedagogico.titulo, mPedagogico.descripcion, mPedagogico.dataURL);
        return `Material Pedagógico actualizado?: ${result}`;
    }
    eliminarArbol(idMP) {
        let result = this.pedagogiaManager.deleteMP(idMP);
        return `Material Pedagógico eliminado?: ${result}`;
    }
};
__decorate([
    common_1.Get('/:idMP'),
    __param(0, common_1.Param('idMP')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PedagogiaController.prototype, "getPedagogia", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PedagogiaController.prototype, "getPedagogias", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pedagogia_dto_1.PedagogiaDTO]),
    __metadata("design:returntype", Promise)
], PedagogiaController.prototype, "crearPedagogia", null);
__decorate([
    common_1.Put(':idMP'),
    __param(0, common_1.Body()), __param(1, common_1.Param('idMP')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pedagogia_dto_1.PedagogiaDTO, String]),
    __metadata("design:returntype", String)
], PedagogiaController.prototype, "modificarPedagogia", null);
__decorate([
    common_1.Delete(':idMP'),
    __param(0, common_1.Param('idMP')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], PedagogiaController.prototype, "eliminarArbol", null);
PedagogiaController = __decorate([
    common_1.Controller('pedagogia'),
    __metadata("design:paramtypes", [pedagogia_service_1.PedagogiaService])
], PedagogiaController);
exports.PedagogiaController = PedagogiaController;
//# sourceMappingURL=pedagogia.controller.js.map