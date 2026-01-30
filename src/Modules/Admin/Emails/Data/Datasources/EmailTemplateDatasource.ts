
import BackendDatasource from "@/Core/Data/Datasources/BackendDatasource";
import { EmailTemplateDTO } from "../DTOs/EmailTemplateDTO";
import { Result } from "neverthrow";

/**
 * EmailTemplateDatasource is a class that is used to get the email templates from the API.
 */
export default class EmailTemplateDatasource extends BackendDatasource {

    /**
     * Get all email templates.
     * @returns The list of email templates.
     */
    public async GetAllTemplates(): Promise<Result<EmailTemplateDTO[], string>> {
        return this.get<EmailTemplateDTO[]>('/email-templates', true);
    }

    /**
     * Add an attachment to an email template.
     * @param templateId The ID of the email template.
     * @param file The file to add as an attachment.
     * @param attachmentName The name of the attachment.
     * @returns The result of the operation.
     */
    public async AddAttachment(templateId: string, file: File, attachmentName: string): Promise<Result<string, string>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('attachmentName', attachmentName);
        formData.append('templateId', templateId);
        return this.put<string>(`/email-templates/add-attachment`, formData, true, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * Change the name of an email template.
     * @param templateId The ID of the email template.
     * @param newName The new name of the email template.
     * @returns The result of the operation.
     */
    public async ChangeTemplateName(templateId: string, newName: string): Promise<Result<void, string>> {
        return this.patch<void>(`/email-templates/change-name`, { templateId, newName }, true);
    }

    /**
     * Edit the content of an email template.
     * @param templateId The ID of the email template.
     * @param newContent The new content of the email template.
     * @returns The result of the operation.
     */
    public async EditTemplateContent(templateId: string, newContent: File): Promise<Result<void, string>> {
        const formData = new FormData();
        formData.append('templateFile', newContent);
        formData.append('templateId', templateId);
        return this.patch<void>(`/email-templates/change-contents`, formData, true, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * Get the URL of an email template.
     * @param templateId The ID of the email template.
     * @returns The URL of the email template content.
     */
    public async GetTemplateContentUrl(templateId: string): Promise<Result<string, string>> {
        return this.get<string>(`/email-templates/url?TemplateID=${templateId}`, true);
    }

    /**
     * Create a new email template skeleton.
     * @param templateName The name of the email template.
     * @returns The ID of the new email template.
     */
    public CreateTemplateSkeleton(templateName: string): Promise<Result<string, string>> {
        return this.put<string>(`/email-templates/create-skeleton?templateName=${templateName}`, {}, true);
    }

}