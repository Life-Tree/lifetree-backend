import { Credential } from "../../domain/credential";
import { User } from "../../domain/user";

export interface ISignupService{
    signup(user: User, credential: Credential): Promise<Map<string,any>>;
    activateCredential(credential: Credential): Promise<Map<string,any>>;
}