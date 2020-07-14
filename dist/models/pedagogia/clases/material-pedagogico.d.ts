export declare class MaterialPedagogico {
    private titulo;
    private descripcion;
    private dataURL;
    constructor(titulo: string, descripcion: string, dataURL: string);
    getTitulo(): string;
    getDescripcion(): string;
    getDataURL(): string;
    setTitulo(t: string): void;
    setDescripcion(des: string): void;
    setDataURL(dat: string): void;
}
