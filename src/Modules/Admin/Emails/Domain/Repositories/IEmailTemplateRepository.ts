import { Result } from "neverthrow";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";



/**
 * Interface for the email template repository.
 */
export default interface IEmailTemplateRepository {

    /**
     * Gets all email templates.
     * @returns A promise that resolves to a Result object containing either the email templates or an error message.
     */
    GetAllTemplates(): Promise<Result<EmailTemplate[], EmailTemplateErrors>>;


    /**
     * Adds an attachment to an email template.
     * @param templateId The ID of the email template.
     * @param file The file to add as an attachment.
     * @param attachmentName The name of the attachment.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    AddAttachment(templateId: string, file: File, attachmentName: string): Promise<Result<string, EmailTemplateErrors>>;

    /**
     * Changes the name of an email template.
     * @param templateId The ID of the email template.
     * @param newName The new name of the email template.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    ChangeTemplateName(templateId: string, newName: string): Promise<Result<void, EmailTemplateErrors>>;

    /**
     * Edits the content of an email template.
     * @param templateId The ID of the email template.
     * @param newContent The new content of the email template.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    EditTemplateContent(templateId: string, newContent: File): Promise<Result<void, EmailTemplateErrors>>;

    /**
     * Gets the URL of the content of an email template.
     * @param templateId The ID of the email template.
     * @returns A promise that resolves to a Result object containing either the URL of the content or an error message.
     */
    GetTemplateContentUrl(templateId: string): Promise<Result<string, EmailTemplateErrors>>;

    /**
     * Creates a new email template skeleton.
     * @param templateName The name of the email template.
     * @returns A promise that resolves to a Result object containing either the ID of the new template or an error message.
     */
    CreateTemplateSkeleton(templateName: string): Promise<Result<string, EmailTemplateErrors>>;
}