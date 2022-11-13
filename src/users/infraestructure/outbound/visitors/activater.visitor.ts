import { UserPassCredential } from "src/users/core/domain/userPassCredential";
import { IVisitor } from "src/users/core/ports/inbounding/visitor";
import { Inject, Injectable } from "@nestjs/common";
import { IUserPassCredentialRepository } from "src/users/core/ports/outbounding/userPassCredential.repository";

@Injectable()
export class ActivaterVisitor implements IVisitor{
    constructor(
        @Inject('UserPassCredentialRepositoryMongo') private userPassRepo: IUserPassCredentialRepository
    ){}

    async doForUserPass(userPassCredential: UserPassCredential): Promise<Map<string, any>> {
        const userPassCredentialFromDb: UserPassCredential = await this.userPassRepo.getCredentialByUserId(userPassCredential.getUserId());
        const canActivate = userPassCredentialFromDb && userPassCredential.getActivationToken() === userPassCredentialFromDb.getActivationToken();
        const response: Map<string, any> = new Map<string, any>();
        if(canActivate){
            userPassCredentialFromDb.setActive(true);
            userPassCredentialFromDb.setActivationToken('');
            const updatedCredential: UserPassCredential = await this.userPassRepo.updateCredential(userPassCredentialFromDb);
            if(updatedCredential && updatedCredential.getId() == userPassCredentialFromDb.getId()){
                response.set('status', 1);
                return response;
            }
        }
        response.set('status', 0);
        return response;
    }
}