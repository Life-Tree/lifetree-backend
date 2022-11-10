import { FileType } from "../enums/enums";

export class File{
    private type: FileType
    private url: string;
    private base64: string;

    public getType(): FileType {
        return this.type;
    }

    public setType(type: FileType): void {
        this.type = type;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public getBase64(): string {
        return this.base64;
    }

    public setBase64(base64: string): void {
        this.base64 = base64;
    }



}