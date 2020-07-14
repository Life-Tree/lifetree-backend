export declare class Ubicacion {
    private latitud;
    private longitud;
    private barrio;
    constructor(lat: number, lon: number, barr: string);
    getLatitud(): number;
    getLongitud(): number;
    getBarrio(): string;
    setLatitud(lat: number): void;
    setLongitud(lon: number): void;
    setBarrio(barr: string): void;
}
