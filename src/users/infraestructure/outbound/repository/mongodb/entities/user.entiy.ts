import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Role } from "src/users/core/domain/role";
import {User} from "src/users/core/domain/user";
import { IRoleRepository } from "src/users/core/ports/outbounding/role.repository";

export class UserEntity{
    public _id?: ObjectId;
    public address: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public idtype: number;
    public idNumber: string;
    public role: ObjectId;
    public phone: string;
}

@Injectable()
export class UserEntityMapper{
    constructor(
        @Inject('RoleRepositoryMongo')
        private roleRepo: IRoleRepository
    ){}
    public async entityToDomain(entity: UserEntity): Promise<User>{
        const domain = new User();
        domain.setId(entity._id.toHexString());
        domain.setFirstName(entity.firstName);
        domain.setLastName(entity.lastName);
        domain.setEmail(entity.email);
        domain.setIdtype(entity.idtype);
        domain.setIdNumber(entity.idNumber);
        domain.setAddress(entity.address);
        domain.setPhone(entity.phone);
        const role: Role = await this.roleRepo.findById(entity.role.toHexString());
        domain.setRole(role);
        return domain;
    }

    public async entitysToDomains(entities: UserEntity[]): Promise<User[]> {
        const domains: User[] = [];
        for (const entity of entities) {
            const domain = await this.entityToDomain(entity);
            domains.push(domain);
        }
        return domains;
    }

    public domainToEntity(domain: User): UserEntity {
        const entity: UserEntity = new UserEntity()
        if(domain.getId() !== null && domain.getId() !== undefined && domain.getId() !== ''){
            entity._id = new ObjectId(domain.getId());
        }
        entity.firstName = domain.getFirstName();
        entity.lastName = domain.getLastName();
        entity.address = domain.getAddress();
        entity.email = domain.getEmail();
        entity.idNumber = domain.getIdNumber();
        entity.idtype = domain.getIdtype();
        entity.role = new ObjectId(domain.getRole().getId());
        entity.phone = domain.getPhone();
        return entity;
    }
}