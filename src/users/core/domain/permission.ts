import { PermissionName } from "../enums/enums";

export class Permission{
    private id: string;
    private name: PermissionName;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): PermissionName {
        return this.name;
    }

    public setName(name: PermissionName): void {
        this.name = name;
    }


}