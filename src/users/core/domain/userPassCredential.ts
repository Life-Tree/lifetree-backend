import { IVisitor } from "../ports/inbounding/visitor";
import { Credential } from "./credential";

export class UserPassCredential extends Credential{
    private email: string;
    private password: string;
    private active: boolean;
    private token: string;
    private activationToken: string;
    private resetPasswordToken: string;

    public acceptVisitor(visitor: IVisitor): Promise<Map<string, any>>{
        return visitor.doForUserPass(this);
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public isActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public getActivationToken(): string {
        return this.activationToken;
    }

    public setActivationToken(activationToken: string): void {
        this.activationToken = activationToken;
    }

    public getResetPasswordToken(): string {
        return this.resetPasswordToken;
    }

    public setResetPasswordToken(resetPasswordToken: string): void {
        this.resetPasswordToken = resetPasswordToken;
    }

}