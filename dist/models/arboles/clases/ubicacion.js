"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ubicacion = void 0;
class Ubicacion {
    constructor(lat, lon, barr) {
        this.latitud = lat;
        this.longitud = lon;
        this.barrio = barr;
    }
    getLatitud() {
        return this.latitud;
    }
    getLongitud() {
        return this.longitud;
    }
    getBarrio() {
        return this.barrio;
    }
    setLatitud(lat) {
        this.latitud = lat;
    }
    setLongitud(lon) {
        this.longitud = lon;
    }
    setBarrio(barr) {
        this.barrio = barr;
    }
}
exports.Ubicacion = Ubicacion;
//# sourceMappingURL=ubicacion.js.map