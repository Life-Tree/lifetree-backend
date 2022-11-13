import { User } from "../../domain/user";

export interface IUserRepository{
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    findUsersByRoleName(roleName: string): Promise<User[]>;
    findUsers(): Promise<User[]>;
    save(user: User): Promise<User>;
    update(user: User): Promise<User>;
}