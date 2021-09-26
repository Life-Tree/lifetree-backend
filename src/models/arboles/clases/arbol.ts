import { Ubicacion } from "./ubicacion";
import { Intervencion } from "./intervencion";
import { ImageSet } from "./imageset";

export enum EstadoArbol{
    ENFERMO = "ENFERMO",
    INTERVENIDO ="INTERVENIDO",
    CURADO = "CURADO",
}

export class Arbol {
    private descripcion: string;
    private imageSet: ImageSet;    
    private ubicacion: Ubicacion;
    private intervenciones: Intervencion[];
    private estado: EstadoArbol;

    constructor(des: string, ubic: Ubicacion, imageSet?: ImageSet ){
        this.descripcion = des;
        this.imageSet = imageSet;
        this.ubicacion = ubic;
        this.intervenciones = [];
        this.estado = EstadoArbol.ENFERMO;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getImageSet(): ImageSet {
        return this.imageSet;
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

    public setImageSet(imgs: ImageSet) {
        this.imageSet = imgs;
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
