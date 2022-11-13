import { PermissionName } from "../../enums/enums";

export interface IAuthorizer{
    hasPermission(userId: string, permissionNames: PermissionName[]): Promise<boolean>;
}