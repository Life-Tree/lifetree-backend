export enum EstadoIntervencion{
    PENDIENTE,
    APROBADA,
    RECHAZADA,
}
export class Intervencion {
    private imagenesURL: string[];
    private descripcion: string;
    private estado: EstadoIntervencion;

    constructor(imgs: string[], des: string, est: EstadoIntervencion){
        this.imagenesURL = imgs;
        this.descripcion = des;
        this.estado = est;
    }

    public getImagenesURL(): string[]{
        return this.imagenesURL;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getEstaso(): EstadoIntervencion{
        return this.estado;
    }

    public setImagenesURL(imgs: string[]): void{
        this.imagenesURL = imgs;
    }

    public setDescripcio(des: string): void{
        this.descripcion = des;
    }

    public setEstado(est: EstadoIntervencion): void{
        this.estado = est;
    }


}
