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
exports.PedagogiaService = void 0;
const common_1 = require("@nestjs/common");
const material_pedagogico_1 = require("./clases/material-pedagogico");
const persistencia_service_1 = require("../persistencia/persistencia.service");
let PedagogiaService = class PedagogiaService {
    constructor(persistencia) {
        this.persistencia = persistencia;
    }
    async nuevoMP(titulo, descripcion, dataURL) {
        let nuevoMP = new material_pedagogico_1.MaterialPedagogico(titulo, descripcion, dataURL);
        return await this.persistencia.saveOne(nuevoMP, 0, 'instructivos');
    }
    async getMPs() {
        return await this.persistencia.getAll(0, "instructivos");
    }
    async getMP(id) {
        return await this.persistencia.getOne(id, 0, "instructivos");
    }
    async updateMP(id, titulo, descripcion, dataURL) {
        let nuevoMP = new material_pedagogico_1.MaterialPedagogico(titulo, descripcion, dataURL);
        return await this.persistencia.updateOne(id, nuevoMP, 0, "instructivos");
    }
    async deleteMP(id) {
        return await this.persistencia.deleteOne(id, 0, "instructivos");
    }
};
PedagogiaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [persistencia_service_1.PersistenciaService])
], PedagogiaService);
exports.PedagogiaService = PedagogiaService;
//# sourceMappingURL=pedagogia.service.js.map