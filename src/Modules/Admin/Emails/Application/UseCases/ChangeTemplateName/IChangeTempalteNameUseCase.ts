import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * @description Interface for the change template name use case.
 */
export default interface IChangeTemplateNameUseCase {
    /**
     * @description Changes the name of an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {string} newName - The new name of the email template.
     * @returns {Promise<Result<void, EmailTemplateErrors>>}
     */
    Execute(templateId: string, newName: string): Promise<Result<void, EmailTemplateErrors>>;
}   