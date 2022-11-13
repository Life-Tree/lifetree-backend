import { IEncoder } from "src/users/core/ports/outbounding/encoder";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class EncoderBcrypt implements IEncoder{
    private SALT = 10;

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
    
    async encodePassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.SALT);
    }
    
}