import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { ITokenGenerator } from "src/users/core/ports/outbounding/token.generator";

@Injectable()
export class TokenGeneratorJwt implements ITokenGenerator{
    constructor(private jwtService: JwtService){}
    generateToken(userId: string, userEmail: string): string {
        const payload = { username: userEmail, sub: userId };
        return this.jwtService.sign(payload);
    }    
}