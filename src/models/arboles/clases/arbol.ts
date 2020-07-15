import { Ubicacion } from "./ubicacion";
import { Intervencion } from "./intervencion";

export enum EstadoArbol{
    ENFERMO = "ENFERMO",
    INTERVENIDO ="INTERVENIDO",
    CURADO = "CURADO",
}

export class Arbol {
    private descripcion: string;
    private imagenURL: string;    
    private ubicacion: Ubicacion;
    private intervenciones: Intervencion[];
    private estado: EstadoArbol;

    constructor(des: string, img: string ,ubic: Ubicacion){
        this.descripcion = des;
        this.imagenURL = img;
        this.ubicacion = ubic;
        this.intervenciones = [];
        this.estado = EstadoArbol.ENFERMO;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getImagenURL(): string {
        return this.imagenURL;
    }    

    public getUbicacion(): Ubicacion{
        return this.ubicacion;
    }

    public getIntervenciones(): Intervencion[]{
        return this.intervenciones;
    }

    public getEstado(): EstadoArbol{
        return this.estado;
    }

    public setDescripcion(des: string): void{
        this.descripcion = des;
    }

    public setImagenURL(img: string) {
        this.imagenURL = img;
    }

    public setUbicacion(ubic: Ubicacion): void{
        this.ubicacion = ubic;
    }

    public setIntervenciones(inters: Intervencion[]): void{
        this.intervenciones = inters;
    }

    public addIntervencion(inter: Intervencion): void{
        this.intervenciones.push(inter);
    }

    public setEstado(est: EstadoArbol): void{
        this.estado = est;
    }

}
