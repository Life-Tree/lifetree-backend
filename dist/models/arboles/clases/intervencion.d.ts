export declare enum EstadoIntervencion {
    PENDIENTE = 0,
    APROBADA = 1,
    RECHAZADA = 2
}
export declare class Intervencion {
    private imagenesURL;
    private descripcion;
    private estado;
    constructor(imgs: string[], des: string, est: EstadoIntervencion);
    getImagenesURL(): string[];
    getDescripcion(): string;
    getEstaso(): EstadoIntervencion;
    setImagenesURL(imgs: string[]): void;
    setDescripcio(des: string): void;
    setEstado(est: EstadoIntervencion): void;
}
