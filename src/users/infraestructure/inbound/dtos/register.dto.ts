import { Inject, Injectable } from "@nestjs/common";
import { Credential } from "src/users/core/domain/credential";
import { Role } from "src/users/core/domain/role";
import { User } from "src/users/core/domain/user";
import { UserPassCredential } from "src/users/core/domain/userPassCredential";
import { IdType, RoleNames } from "src/users/core/enums/enums";
import { IRoleService } from "src/users/core/ports/inbounding/role.service";

export class RegisterDto{
    public id?: string;
    public address: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public idType: IdType;
    public idNumber: string;
    public roleName: string;
    public password: string;
}

@Injectable()
export class RegisterDtoMapper{
    constructor(@Inject('RoleServiceImpl') private roleService: IRoleService){}
    async getUser(dto: RegisterDto): Promise<User> {
        const domain: User = new User();
        domain.setId(dto.id);
        domain.setAddress(dto.address);
        domain.setEmail(dto.email);
        domain.setFirstName(dto.firstName);
        domain.setLastName(dto.lastName);
        domain.setIdtype(dto.idType);
        domain.setIdNumber(dto.idNumber);
        const role: Role = await this.roleService.getRoleByRoleName(RoleNames.CITIZEN);
        domain.setRole(role)
        return domain;
    }

    getUserPassCredential(dto: RegisterDto): Credential{
        const domain: UserPassCredential = new UserPassCredential();
        domain.setEmail(dto.email);
        domain.setPassword(dto.password);
        return domain;
    }
}

