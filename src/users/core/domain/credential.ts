import { IVisitor } from "../ports/inbounding/visitor";

export abstract class Credential{
    private id?: string;
    private userId: string;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public abstract acceptVisitor(visitor: IVisitor): Promise<Map<string, any>>;
}