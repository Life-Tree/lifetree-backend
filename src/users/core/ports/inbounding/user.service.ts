import { User } from "../../domain/user";

export interface IUserService{
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    getUsersByRoleName(roleName: string): Promise<User[]>;
    getUsers(): Promise<User[]>;
    saveUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
}