import { User } from "../../domain/user";

export interface IEmailSender{
    sendEmail(user: User, activationUrl: string): Promise<boolean>;
}