import { Result } from "neverthrow";
import IEmailTemplateContentRepository from "../../Domain/Repositories/IEmailTemplateContentRepository";
import EmailTemplateContentDatasource from "../Datasources/EmailTemplateContentDatasource";
import { EmailTemplateErrors } from "../../Domain/Errors/EmailTemplateErrors";

/**
 * Implementation of the email template content repository.
 */
export default class EmailTemplateContentRepositoryImpl implements IEmailTemplateContentRepository {
    /**
     * Creates an instance of EmailTemplateContentRepositoryImpl.
     * @param Datasource The datasource for email template content.
     */
    constructor(private Datasource: EmailTemplateContentDatasource) { }

    /**
     * Gets the content of an email template.
     * @param templateURL The URL of the email template.
     * @returns A promise that resolves to a `Result` object containing either the email template content or an error message.
     */
    public async GetEmailTemplateContent(templateURL: string): Promise<Result<string, EmailTemplateErrors>> {
        const result: Result<string, string> = await this.Datasource.GetEmailTemplateContent(templateURL);
        return result.mapErr((error) => error as EmailTemplateErrors);
    }
}   