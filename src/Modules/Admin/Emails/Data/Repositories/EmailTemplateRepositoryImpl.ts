import IEmailTemplateRepository from "../../Domain/Repositories/IEmailTemplateRepository";
import EmailTemplateDatasource from "../Datasources/EmailTemplateDatasource";
import { Result } from "neverthrow";
import { EmailTemplate } from "@admin/emailTempaltes/Domain/Models/EmailTemplate";
import { EmailTemplateDTO } from "@admin/emailTempaltes/Data/DTOs/EmailTemplateDTO";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";

/**
 * Implementation of the email template repository.
 */
export default class EmailTemplateRepositoryImpl implements IEmailTemplateRepository {

    constructor(private Datasource: EmailTemplateDatasource = new EmailTemplateDatasource()) {
    }

    /**
     * Gets all email templates.
     * @returns A promise that resolves to a Result object containing either the email templates or an error message.
     */
    public async GetAllTemplates(): Promise<Result<EmailTemplate[], EmailTemplateErrors>> {
        const result: Result<EmailTemplateDTO[], string> = await this.Datasource.GetAllTemplates();

        return result.map((templates) => templates.map((template) => {
            return {
                ID: template.id,
                Name: template.name,
            }
        })).mapErr((error) => error as EmailTemplateErrors);
    }
}