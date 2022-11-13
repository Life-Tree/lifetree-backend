import { Injectable } from "@nestjs/common";
import { Credential } from "../core/domain/credential";
import { User } from "../core/domain/user";
import { VisitorsNames } from "../core/enums/enums";
import { IAuthenticator } from "../core/ports/inbounding/authenticator";
import { IVisitor } from "../core/ports/inbounding/visitor";
import { VisitorFactory } from "./visitor.factory";

@Injectable()
export class Authenticator implements IAuthenticator{
    constructor(
        private visitorFactory: VisitorFactory
    ){}
    async login(credential: Credential): Promise<Map<string, any>> {
        const visitor: IVisitor = this.visitorFactory.getVisitor(VisitorsNames.LOGIN);
        return await credential.acceptVisitor(visitor);
    }

    logout(credential: Credential): Promise<Map<string, string>> {
        const visitor: IVisitor = this.visitorFactory.getVisitor(VisitorsNames.LOGOUT);
        return credential.acceptVisitor(visitor);
    }
    
}