"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudFactory = void 0;
const crud_mongo_1 = require("./implementaciones/crud.mongo");
const common_1 = require("@nestjs/common");
let CrudFactory = class CrudFactory {
    createCRUD(type, tablaName) {
        let crud;
        switch (type) {
            case 0:
                crud = new crud_mongo_1.CrudMongo(tablaName);
                break;
            default:
                crud = new crud_mongo_1.CrudMongo(tablaName);
                break;
        }
        return crud;
    }
};
CrudFactory = __decorate([
    common_1.Injectable()
], CrudFactory);
exports.CrudFactory = CrudFactory;
//# sourceMappingURL=crud.factory.js.map