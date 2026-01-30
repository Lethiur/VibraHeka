import IEmailTemplateRepository from "../../Domain/Repositories/IEmailTemplateRepository";
import EmailTemplateDatasource from "../Datasources/EmailTemplateDatasource";
import { Result } from "neverthrow";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import { EmailTemplateDTO } from "@admin/emailTemplates/Data/DTOs/EmailTemplateDTO";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * Implementation of the email template repository.
 */
export default class EmailTemplateRepositoryImpl implements IEmailTemplateRepository {

    constructor(private Datasource: EmailTemplateDatasource = new EmailTemplateDatasource()) {
    }

    /**
     * Creates a new email template skeleton.
     * @param templateName The name of the email template.
     * @returns A promise that resolves to a Result object containing either the ID of the new template or an error message.
     */
    public async CreateTemplateSkeleton(templateName: string): Promise<Result<string, EmailTemplateErrors>> {
        const result: Result<string, string> = await this.Datasource.CreateTemplateSkeleton(templateName);
        return result.mapErr((error) => error as EmailTemplateErrors);
    }

    /**
     * Gets the URL of the content of an email template.
     * @param templateId The ID of the email template.
     * @returns A promise that resolves to a Result object containing either the URL of the content or an error message.
     */
    public async GetTemplateContentUrl(templateId: string): Promise<Result<string, EmailTemplateErrors>> {
        const result: Result<string, string> = await this.Datasource.GetTemplateContentUrl(templateId);
        return result.mapErr((error) => error as EmailTemplateErrors);
    }

    /**
     * Adds an attachment to an email template.
     * @param templateId The ID of the email template.
     * @param file The file to add as an attachment.
     * @param attachmentName The name of the attachment.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    public async AddAttachment(templateId: string, file: File, attachmentName: string): Promise<Result<string, EmailTemplateErrors>> {
        const result: Result<string, string> = await this.Datasource.AddAttachment(templateId, file, attachmentName);
        return result.mapErr((error) => error as EmailTemplateErrors);
    }

    /**
     * Changes the name of an email template.
     * @param templateId The ID of the email template.
     * @param newName The new name of the email template.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    public async ChangeTemplateName(templateId: string, newName: string): Promise<Result<void, EmailTemplateErrors>> {
        const result: Result<void, string> = await this.Datasource.ChangeTemplateName(templateId, newName);
        return result.mapErr((error) => error as EmailTemplateErrors);
    }

    /**
     * Edits the content of an email template.
     * @param templateId The ID of the email template.
     * @param newContent The new content of the email template.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    public async EditTemplateContent(templateId: string, newContent: File): Promise<Result<void, EmailTemplateErrors>> {
        const result: Result<void, string> = await this.Datasource.EditTemplateContent(templateId, newContent);
        return result.mapErr((error) => error as EmailTemplateErrors);
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
                Created: template.created,
                LastModified: template.lastModified
            }
        })).mapErr((error) => error as EmailTemplateErrors);
    }
}