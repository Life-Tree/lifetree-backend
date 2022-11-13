import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/core/domain/user";
import { IEmailSender } from "src/users/core/ports/outbounding/email.sender";

@Injectable()
export class EmailSenderNodeMailer implements IEmailSender{
    constructor(private mailerService: MailerService){}

    async sendEmail(user: User, activationUrl: string): Promise<boolean> {
        await this.mailerService.sendMail({
            to: user.getEmail(),
            // from: '"Support Team" <support@example.com>', // override default from
            subject: '¡Bienvenido a Ebano App! Confirma tu email',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name: user.getFirstName(),
                url: activationUrl,
            },
        });
        return true;
    }
    
}