import { Ubicacion } from "./ubicacion";
import { Intervencion } from "./intervencion";
import { ImageSet } from "./imageset";
import { Species } from "./especie";
import { DEFAULT_FAMILY, DEFAULT_SPECIES, DEFAULT_SCIENT_NAME } from "../consts/constantes";

export enum EstadoArbol{
    ENFERMO = "ENFERMO",
    INTERVENIDO ="INTERVENIDO",
    CURADO = "CURADO",
}

export class Arbol {
    private _id?: string;
    private descripcion: string;
    private imageSet: ImageSet;    
    private ubicacion: Ubicacion;
    private intervenciones: Intervencion[];
    private estado: EstadoArbol;
    private species: Species;

    constructor(des: string, ubic: Ubicacion, imageSet?: ImageSet ){
        this.descripcion = des;
        this.imageSet = imageSet;
        this.ubicacion = ubic;
        this.intervenciones = [];
        this.estado = EstadoArbol.ENFERMO;
        this.species = new Species(DEFAULT_SPECIES, DEFAULT_SCIENT_NAME, DEFAULT_FAMILY);
    }

    public get_Id(): string {
        return this._id;
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

    public getSpecies(): Species{
        return this.species;
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

    public setSpecies(species: Species): void {
        this.species = species;
    }

    public set_Id(id: string): void {
        this._id = id;
    }

}
