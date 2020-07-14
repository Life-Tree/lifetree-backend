import { Ubicacion } from "./ubicacion";
import { Intervencion } from "./intervencion";
export declare enum EstadoArbol {
    ENFERMO = 0,
    INTERVENIDO = 1,
    CURADO = 2
}
export declare class Arbol {
    private descripcion;
    private imagenURL;
    private ubicacion;
    private intervenciones;
    private estado;
    constructor(des: string, img: string, ubic: Ubicacion);
    getDescripcion(): string;
    getImagenURL(): string;
    getUbicacion(): Ubicacion;
    getIntervenciones(): Intervencion[];
    getEstado(): EstadoArbol;
    setDescripcion(des: string): void;
    setImagenURL(img: string): void;
    setUbicacion(ubic: Ubicacion): void;
    addIntervencion(inter: Intervencion): void;
    setEstado(est: EstadoArbol): void;
}
