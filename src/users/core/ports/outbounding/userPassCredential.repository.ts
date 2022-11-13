import { UserPassCredential } from "../../domain/userPassCredential";

export interface IUserPassCredentialRepository {
    getCredentialByEmail(email: string): Promise<UserPassCredential>;
    getCredentialByUserId(userId: string): Promise<UserPassCredential>;
    saveCredential(userPassCredential: UserPassCredential): Promise<UserPassCredential>;
    updateCredential(userPassCredential: UserPassCredential): Promise<UserPassCredential>;
}