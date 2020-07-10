export class Ubicacion {
    private latitud: number;    
    private longitud: number;    
    private barrio: string;

    constructor(lat: number,lon: number, barr: string){
        this.latitud = lat;
        this.longitud = lon;
        this.barrio = barr;
    }

    public getLatitud(): number{
        return this.latitud;
    }
    
    public getLongitud(): number{
        return this.longitud;
    }

    public getBarrio(): string{
        return this.barrio;
    }

    public setLatitud(lat: number): void{
        this.latitud = lat;
    }

    public setLongitud(lon: number): void{
        this.longitud = lon;
    }

    public setBarrio(barr: string): void{
        this.barrio= barr;
    }

}

