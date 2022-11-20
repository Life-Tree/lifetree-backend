export interface IEmailSender{
    sendEmail(reportEmailBody: any): Promise<boolean>;
}