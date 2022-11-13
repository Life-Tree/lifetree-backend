import { UserPassCredential } from "src/users/core/domain/userPassCredential";
import { IVisitor } from "src/users/core/ports/inbounding/visitor";
import { Inject, Injectable } from "@nestjs/common";
import { IEncoder } from "src/users/core/ports/outbounding/encoder";
import { IUserPassCredentialRepository } from "src/users/core/ports/outbounding/userPassCredential.repository";
import { ITokenGenerator } from "src/users/core/ports/outbounding/token.generator";
import { IEmailSender } from "src/users/core/ports/outbounding/email.sender";
import { User } from "src/users/core/domain/user";
import { IUserRepository } from "src/users/core/ports/outbounding/user.repository";

@Injectable()
export class SaverVisitor implements IVisitor{
    constructor(
        @Inject('UserPassCredentialRepositoryMongo') private userPassRepo: IUserPassCredentialRepository,
        @Inject('EncoderBcrypt') private encoder: IEncoder,
        @Inject('TokenGeneratorJwt') private tokenGenerator: ITokenGenerator,
        @Inject('EmailSenderNodeMailer') private emailSender: IEmailSender,
        @Inject('UserRepositoryMongo') private userRepo: IUserRepository,
    ){}

    async doForUserPass(userPassCredential: UserPassCredential): Promise<Map<string, any>> {
        userPassCredential.setActive(false);
        const activationToken = this.tokenGenerator.generateToken(userPassCredential.getUserId(), userPassCredential.getEmail())
        userPassCredential.setActivationToken(activationToken);
        const hash = await this.encoder.encodePassword(userPassCredential.getPassword());
        userPassCredential.setPassword(hash);
        const credentialSaved: UserPassCredential = await this.userPassRepo.saveCredential(userPassCredential);
        const response: Map<string, any> = new Map<string, any>();
        if(credentialSaved && credentialSaved.getId() != ""){
            const user: User = await this.userRepo.findById(userPassCredential.getUserId());
            const activationUrl = process.env.BASE_URL+'/auth/signup/activate/'+user.getId()+'/'+activationToken;
            await this.emailSender.sendEmail(user, activationUrl);
            response.set('status', 1);
            return response;
        }
        response.set('status', 0);
        response.set('reason', 'Error saving credentials');
        return response;
    }
}