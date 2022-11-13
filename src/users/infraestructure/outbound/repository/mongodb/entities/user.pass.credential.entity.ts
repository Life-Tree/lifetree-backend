import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { UserPassCredential } from "src/users/core/domain/userPassCredential";

export class UserPassCredentialEntity{
    public _id?: ObjectId;
    public userId: string;
    public email: string;
    public password: string;
    public active: boolean;
    public token: string;
    public activationToken: string;
    public resetPasswordToken: string;
}

@Injectable()
export class UserPassCredentialEntityMapper{
    public async entityToDomain(entity: UserPassCredentialEntity): Promise<UserPassCredential>{
        const domain = new UserPassCredential();
        domain.setId(entity._id.toHexString());
        domain.setEmail(entity.email);
        domain.setUserId(entity.userId);
        domain.setPassword(entity.password);
        domain.setActive(entity.active);
        domain.setActivationToken(entity.activationToken);
        domain.setToken(entity.token);
        domain.setResetPasswordToken(entity.resetPasswordToken);
        return domain;
    }

    public async entitysToDomains(entities: UserPassCredentialEntity[]): Promise<UserPassCredential[]> {
        const domains: UserPassCredential[] = [];
        for (const entity of entities) {
            const domain = await this.entityToDomain(entity);
            domains.push(domain);
        }
        return domains;
    }

    public domainToEntity(domain: UserPassCredential): UserPassCredentialEntity {
        const entity: UserPassCredentialEntity = new UserPassCredentialEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.email = domain.getEmail();
        entity.userId = domain.getUserId();
        entity.password = domain.getPassword();
        entity.active = domain.isActive();
        entity.activationToken = domain.getActivationToken();
        entity.token = domain.getToken();
        entity.resetPasswordToken = domain.getResetPasswordToken();
        return entity;
    }
}