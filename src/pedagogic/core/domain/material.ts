import { Segment } from "./segment";

export class Material{
    private id: string;
    private segments: Segment[];
    private title: string;

    public getSegments(): Segment[] {
        return this.segments;
    }

    public setSegments(segments: Segment[]): void {
        this.segments = segments;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

}