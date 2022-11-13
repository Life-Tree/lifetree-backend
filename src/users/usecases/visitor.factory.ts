import { Inject, Injectable } from "@nestjs/common";
import { VisitorsNames } from "../core/enums/enums";
import { IVisitor } from "../core/ports/inbounding/visitor";

@Injectable()
export class VisitorFactory{
    constructor(
        @Inject('LoginVisitor')
        private loginVisitor: IVisitor,
        @Inject('SaverVisitor')
        private saverVisitor: IVisitor,
        @Inject('ActivaterVisitor')
        private activaterVisitor: IVisitor
    ){}

    public getVisitor(visitorName: VisitorsNames): IVisitor {
        switch(visitorName){
            case VisitorsNames.LOGIN:
                return this.loginVisitor;
            case VisitorsNames.SAVER:
                return this.saverVisitor;
            case VisitorsNames.ACTIVATER:
                return this.activaterVisitor;
        }
    }
}