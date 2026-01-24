import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";

/**
 * @description Interface for the add attachment to template use case.
 */
export interface IAddAttachmentToTemplateUseCase {
    /**
     * @description Adds an attachment to an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {File} file - The file to add as an attachment.
     * @param {string} attachmentName - The name of the attachment.
     * @returns {Promise<Result<void, EmailTemplateErrors>>}
     */
    Execute(templateId: string, file: File, attachmentName: string): Promise<Result<void, EmailTemplateErrors>>;
}