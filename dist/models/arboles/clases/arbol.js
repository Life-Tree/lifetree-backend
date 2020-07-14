"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbol = exports.EstadoArbol = void 0;
var EstadoArbol;
(function (EstadoArbol) {
    EstadoArbol[EstadoArbol["ENFERMO"] = 0] = "ENFERMO";
    EstadoArbol[EstadoArbol["INTERVENIDO"] = 1] = "INTERVENIDO";
    EstadoArbol[EstadoArbol["CURADO"] = 2] = "CURADO";
})(EstadoArbol = exports.EstadoArbol || (exports.EstadoArbol = {}));
class Arbol {
    constructor(des, img, ubic) {
        this.descripcion = des;
        this.imagenURL = img;
        this.ubicacion = ubic;
        this.intervenciones = [];
        this.estado = EstadoArbol.ENFERMO;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getImagenURL() {
        return this.imagenURL;
    }
    getUbicacion() {
        return this.ubicacion;
    }
    getIntervenciones() {
        return this.intervenciones;
    }
    getEstado() {
        return this.estado;
    }
    setDescripcion(des) {
        this.descripcion = des;
    }
    setImagenURL(img) {
        this.imagenURL = img;
    }
    setUbicacion(ubic) {
        this.ubicacion = ubic;
    }
    addIntervencion(inter) {
        this.intervenciones.push(inter);
    }
    setEstado(est) {
        this.estado = est;
    }
}
exports.Arbol = Arbol;
//# sourceMappingURL=arbol.js.map