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
exports.PersistenciaService = void 0;
const common_1 = require("@nestjs/common");
const crud_factory_1 = require("./crud.factory");
let PersistenciaService = class PersistenciaService {
    constructor(crudFactory) {
        this.crudFactory = crudFactory;
    }
    saveOne(item, typeCrud, collectionName) {
        let crud = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.create(item);
    }
    getAll(typeCrud, collectionName) {
        let crud = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.findAll();
    }
    getOne(idItem, typeCrud, collectionName) {
        let crud = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.findById(idItem);
    }
    updateOne(idItem, itemToUpdate, typeCrud, collectionName) {
        let crud = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.update(idItem, itemToUpdate);
    }
    deleteOne(idItem, typeCrud, collectionName) {
        let crud = this.crudFactory.createCRUD(typeCrud, collectionName);
        return crud.delete(idItem);
    }
};
PersistenciaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [crud_factory_1.CrudFactory])
], PersistenciaService);
exports.PersistenciaService = PersistenciaService;
//# sourceMappingURL=persistencia.service.js.map