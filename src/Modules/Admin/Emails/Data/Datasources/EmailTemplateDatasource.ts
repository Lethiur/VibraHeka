import BackendDatasource from "@/Core/Data/Datasources/BackendDatasource";
import { EmailTemplateDTO } from "../DTOs/EmailTemplateDTO";
import { Result } from "neverthrow";

/**
 * @description EmailTempalteDatasource is a class that is used to get the email templates from the API.
 */
export default class EmailTempalteDatasource extends BackendDatasource {

    /**
     * @description Get all email templates.
     * @returns {Promise<Result<EmailTemplateDTO[], string>>}
     */
    public async GetAllTemplates(): Promise<Result<EmailTemplateDTO[], string>> {
        return this.get<EmailTemplateDTO[]>('/email-templates', true);
    }

    /**
     * @description Add an attachment to an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {File} file - The file to add as an attachment.
     * @param {string} attachmentName - The name of the attachment.
     * @returns {Promise<Result<void, string>>}
     */
    public async AddAttachment(templateId: string, file: File, attachmentName: string): Promise<Result<void, string>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('attachmentName', attachmentName);
        formData.append('templateId', templateId);
        return this.put<void>(`/email-templates/add-attachment`, formData, true, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * @description Change the name of an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {string} newName - The new name of the email template.
     * @returns {Promise<Result<void, string>>}
     */
    public async ChangeTemplateName(templateId: string, newName: string): Promise<Result<void, string>> {
        return this.patch<void>(`/email-templates/change-name`, { templateId, newName }, true);
    }

    /**
     * @description Edit the content of an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {File} newContent - The new content of the email template.
     * @returns {Promise<Result<void, string>>}
     */
    public async EditTemplateContent(templateId: string, newContent: File): Promise<Result<void, string>> {
        const formData = new FormData();
        formData.append('templateFile', newContent);
        formData.append('templateId', templateId);
        return this.patch<void>(`/email-templates/change-contents`, formData, true, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * @description Get the URL of an email template.
     * @param {string} templateId - The ID of the email template.
     * @returns {Promise<Result<string, string>>}
     */
    public async GetTemplateContentUrl(templateId: string): Promise<Result<string, string>> {
        return this.get<string>(`/email-templates/url?TemplateID=${templateId}`, true);
    }

}