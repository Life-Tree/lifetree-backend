export class MaterialPedagogico{
    private titulo: string;
    private descripcion: string;
    private dataURL: string;

    constructor(titulo: string, descripcion: string, dataURL: string){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.dataURL = dataURL;
    }

    public getTitulo(): string{
        return this.titulo;
    }

    public getDescripcion(): string{
        return this.descripcion;
    }

    public getDataURL(): string{
        return this.dataURL;
    }

    public setTitulo(t: string): void{
        this.titulo = t;
    }

    public setDescripcion(des: string): void{
        this.descripcion = des;
    }

    public setDataURL(dat: string): void{
        this.dataURL = dat;
    }

}