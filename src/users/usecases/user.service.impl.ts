import { Injectable, Inject } from "@nestjs/common";
import { User } from "../core/domain/user";
import { IUserService } from "../core/ports/inbounding/user.service";
import { IUserRepository } from "../core/ports/outbounding/user.repository";

@Injectable()
export class UserServiceImpl implements IUserService{
    constructor(
        @Inject('UserRepositoryMongo')
        private userRepo: IUserRepository){}
    getUserByEmail(email: string): Promise<User> {
        return this.userRepo.findByEmail(email);
    }
    getUserById(id: string): Promise<User> {
        return this.userRepo.findById(id);
    }
    getUsersByRoleName(roleName: string): Promise<User[]> {
        return this.userRepo.findUsersByRoleName(roleName);
    }
    getUsers(): Promise<User[]> {
        return this.userRepo.findUsers();
    }
    saveUser(user: User): Promise<User> {
        return this.userRepo.save(user);
    }
    updateUser(user: User): Promise<User> {
        return this.userRepo.update(user);
    }
    
}