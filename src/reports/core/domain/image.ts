export class Image{
    private name: string;
    private base64: string;
    private url: string;

    constructor(name: string, base64: string, url: string){
        this.name=name;
        this.base64=base64;
        this.url=url;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getBase64(): string {
        return this.base64;
    }

    public setBase64(base64: string): void {
        this.base64 = base64;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

}