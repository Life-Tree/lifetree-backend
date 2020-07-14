"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intervencion = exports.EstadoIntervencion = void 0;
var EstadoIntervencion;
(function (EstadoIntervencion) {
    EstadoIntervencion[EstadoIntervencion["PENDIENTE"] = 0] = "PENDIENTE";
    EstadoIntervencion[EstadoIntervencion["APROBADA"] = 1] = "APROBADA";
    EstadoIntervencion[EstadoIntervencion["RECHAZADA"] = 2] = "RECHAZADA";
})(EstadoIntervencion = exports.EstadoIntervencion || (exports.EstadoIntervencion = {}));
class Intervencion {
    constructor(imgs, des, est) {
        this.imagenesURL = imgs;
        this.descripcion = des;
        this.estado = est;
    }
    getImagenesURL() {
        return this.imagenesURL;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getEstaso() {
        return this.estado;
    }
    setImagenesURL(imgs) {
        this.imagenesURL = imgs;
    }
    setDescripcio(des) {
        this.descripcion = des;
    }
    setEstado(est) {
        this.estado = est;
    }
}
exports.Intervencion = Intervencion;
//# sourceMappingURL=intervencion.js.map