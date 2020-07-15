export enum EstadoIntervencion{
    PENDIENTE = "PENDIENTE",
    APROBADA = "APROBADA",
    RECHAZADA = "RECHAZADA",
}
export class Intervencion {
    private imagenURL: string;
    private descripcion: string;
    private estado: EstadoIntervencion;

    constructor(imgs: string, des: string, est: EstadoIntervencion){
        this.imagenURL = imgs;
        this.descripcion = des;
        this.estado = est;
    }

    public getImagenURL(): string{
        return this.imagenURL;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getEstaso(): EstadoIntervencion{
        return this.estado;
    }

    public setImagenURL(imgs: string): void{
        this.imagenURL = imgs;
    }

    public setDescripcio(des: string): void{
        this.descripcion = des;
    }

    public setEstado(est: EstadoIntervencion): void{
        this.estado = est;
    }


}
