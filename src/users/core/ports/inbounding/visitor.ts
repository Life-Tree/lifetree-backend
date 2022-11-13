import { UserPassCredential } from "../../domain/userPassCredential";

export interface IVisitor{
    doForUserPass(userPassCredential: UserPassCredential): Promise<Map<string,any>>;
}