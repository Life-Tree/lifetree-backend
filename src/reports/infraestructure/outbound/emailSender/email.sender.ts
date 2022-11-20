import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { IEmailSender } from "src/reports/core/ports/outbounding/email.sender";

@Injectable()
export class EmailSenderNodeMailer implements IEmailSender{
    constructor(private mailerService: MailerService){}

    async sendEmail(reportEmailBody: any): Promise<boolean> {
        let conditionsList = "";
        let signSymptomsList = "";
        const date = new Date().toLocaleString();
        reportEmailBody?.reportedTree?.healthStatus?.diagnosis?.conditions?.forEach(condition => {
            conditionsList = conditionsList + condition.commonName + ', ';
        });
        reportEmailBody?.reportedTree?.healthStatus?.reportedSignSymptoms?.forEach(reportedSignSymptom => {
            signSymptomsList = signSymptomsList + reportedSignSymptom.signSymptom.name + ', ';
        });
        reportEmailBody = Object.assign(reportEmailBody, {conditionsList, signSymptomsList, date});
        await this.mailerService.sendMail({
            to: 'atencionalciudadano@epacartagena.gov.co',
            from: '"Ebano App" <ebanoinfomation@gmail.com>', // override default from
            subject: '[Solicitud] Reporte de árbol afectado',
            template: './report', // `.hbs` extension is appended automatically
            context: reportEmailBody,
        });
        return true;
    }
    
}