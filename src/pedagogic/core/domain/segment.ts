import { File } from "./file";

export class Segment{
    private code: string;
    private consecutive: number;
    private description: string;
    private file: File;
    private name: string;
    private text: string;

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getConsecutive(): number {
        return this.consecutive;
    }

    public setConsecutive(consecutive: number): void {
        this.consecutive = consecutive;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getFile(): File {
        return this.file;
    }

    public setFile(file: File): void {
        this.file = file;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }

}