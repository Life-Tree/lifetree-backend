import { Inject, Injectable } from "@nestjs/common";
import { Credential } from "../core/domain/credential";
import { User } from "../core/domain/user";
import { VisitorsNames } from "../core/enums/enums";
import { ISignupService } from "../core/ports/inbounding/signup.service";
import { IUserService } from "../core/ports/inbounding/user.service";
import { IVisitor } from "../core/ports/inbounding/visitor";
import { VisitorFactory } from "./visitor.factory";

@Injectable()
export class SignupServiceImpl implements ISignupService{
    constructor(
        @Inject('UserServiceImpl')
        private userService: IUserService,
        private visitorFactory: VisitorFactory
    ){}
    async signup(user: User, credential: Credential): Promise<Map<string, any>> {
        const userExists: boolean = await this.userService.getUserByEmail(user.getEmail()) ? true : false;
        if(!userExists){
            const userSaved: User = await this.userService.saveUser(user);
            const visitor: IVisitor = this.visitorFactory.getVisitor(VisitorsNames.SAVER);
            credential.setUserId(userSaved.getId());
            return credential.acceptVisitor(visitor);
        }
        const response: Map<string, any> = new Map<string, any>();
        response.set('status', 0);
        response.set('reason', 'User exists');
        return response;
    }
    activateCredential(credential: Credential): Promise<Map<string, any>> {
        const visitor: IVisitor = this.visitorFactory.getVisitor(VisitorsNames.ACTIVATER);
        return credential.acceptVisitor(visitor);
    }
}