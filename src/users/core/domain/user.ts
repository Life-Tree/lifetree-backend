import { IdType } from "../enums/enums";
import { Role } from "./role";

export class User{
    private id?: string;
    private address: string;
    private email: string;
    private firstName: string;
    private lastName: string;
    private idtype: IdType;
    private idNumber: string;
    private role: Role;
    private phone: string;

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getIdtype(): IdType {
        return this.idtype;
    }

    public setIdtype(idtype: IdType): void {
        this.idtype = idtype;
    }

    public getIdNumber(): string {
        return this.idNumber;
    }

    public setIdNumber(idNumber: string): void {
        this.idNumber = idNumber;
    }

    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role): void {
        this.role = role;
    }

}