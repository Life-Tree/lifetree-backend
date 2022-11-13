import { UserPassCredential } from "src/users/core/domain/userPassCredential";
import { IVisitor } from "src/users/core/ports/inbounding/visitor";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/users/core/domain/user";
import { IEncoder } from "src/users/core/ports/outbounding/encoder";
import { IUserPassCredentialRepository } from "src/users/core/ports/outbounding/userPassCredential.repository";
import { IUserRepository } from "src/users/core/ports/outbounding/user.repository";

@Injectable()
export class LoginVisitor implements IVisitor{
    constructor(
        @Inject('UserPassCredentialRepositoryMongo') private userPassRepo: IUserPassCredentialRepository,
        @Inject('UserRepositoryMongo') private userRepo: IUserRepository,
        @Inject('EncoderBcrypt') private encoder: IEncoder
    ){}

    async doForUserPass(userPassCredential: UserPassCredential): Promise<Map<string, any>> {
        const userPassCredentialFromDb: UserPassCredential = await this.userPassRepo.getCredentialByEmail(userPassCredential.getEmail());
        const response: Map<string, any> = new Map<string, any>();
        if(!userPassCredentialFromDb) {
            response.set('status', 0);
            response.set('user', null);
            response.set('reason', 'Usuario no registrado');
            return response;
        }
        const user: User = await this.userRepo.findByEmail(userPassCredential.getEmail());
        if(!userPassCredentialFromDb.isActive()){
            response.set('status', 0);
            response.set('user', user);
            response.set('reason', 'Se requiere confirmación del email');
            return response;
        }
        const canAccess: boolean = userPassCredentialFromDb && userPassCredentialFromDb.isActive() && await this.encoder.compare(userPassCredential.getPassword(), userPassCredentialFromDb.getPassword());
        if(canAccess){
            response.set('status', 1);
            response.set('user', user);
            return response;
        }
        response.set('status', 0);
        response.set('user', user);
        response.set('reason', 'El email o contraseña son incorrectas');
        return response;
    }
}