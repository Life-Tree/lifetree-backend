import { Credential } from "../../domain/credential";
import { User } from "../../domain/user";

export interface IAuthenticator{
    login(credential: Credential): Promise<Map<string, any>>;
    logout(credential: Credential): Promise<Map<string,string>>;
}