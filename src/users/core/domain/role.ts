import { Permission } from "./permission";

export class Role {
    private id?: string;
    private name: string;
    private permissions: Permission[];

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPermissions(): Permission[] {
        return this.permissions;
    }

    public setPermissions(permissions: Permission[]): void {
        this.permissions = permissions;
    }

}