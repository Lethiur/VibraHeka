import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";

/**
 * @description Interface for the change template content use case.
 */
export default interface IChangeTemplateContentUseCase {
    /**
     * @description Changes the content of an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {File} newContent - The new content of the email template.
     * @returns {Promise<Result<void, EmailTemplateErrors>>}
     */
    Execute(templateId: string, newContent: File): Promise<Result<void, EmailTemplateErrors>>;
}   