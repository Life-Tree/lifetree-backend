"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialPedagogico = void 0;
class MaterialPedagogico {
    constructor(titulo, descripcion, dataURL) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.dataURL = dataURL;
    }
    getTitulo() {
        return this.titulo;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getDataURL() {
        return this.dataURL;
    }
    setTitulo(t) {
        this.titulo = t;
    }
    setDescripcion(des) {
        this.descripcion = des;
    }
    setDataURL(dat) {
        this.dataURL = dat;
    }
}
exports.MaterialPedagogico = MaterialPedagogico;
//# sourceMappingURL=material-pedagogico.js.map