import { ImageSet } from "./imageset";

export enum EstadoIntervencion{
    PENDIENTE = "PENDIENTE",
    APROBADA = "APROBADA",
    RECHAZADA = "RECHAZADA",
}
export class Intervencion {
    public imageSet: ImageSet;
    private descripcion: string;
    private estado: EstadoIntervencion;

    constructor(imgs: ImageSet, des: string, est: EstadoIntervencion){
        this.imageSet = imgs;
        this.descripcion = des;
        this.estado = est;
    }

    public getImageSet(): ImageSet{
        return this.imageSet;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getEstado(): EstadoIntervencion{
        return this.estado;
    }

    public setImageSet(imgs: ImageSet): void{
        this.imageSet = imgs;
    }

    public setDescripcio(des: string): void{
        this.descripcion = des;
    }

    public setEstado(est: EstadoIntervencion): void{
        this.estado = est;
    }


}
