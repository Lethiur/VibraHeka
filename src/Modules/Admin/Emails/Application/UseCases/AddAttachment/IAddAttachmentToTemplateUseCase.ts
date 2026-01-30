import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * Interface for the add attachment to template use case.
 */
export interface IAddAttachmentToTemplateUseCase {
    /**
     * Adds an attachment to an email template.
     * @param templateId The ID of the email template.
     * @param file The file to add as an attachment.
     * @param attachmentName The name of the attachment.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    Execute(templateId: string, file: File, attachmentName: string): Promise<Result<string, EmailTemplateErrors>>;
}