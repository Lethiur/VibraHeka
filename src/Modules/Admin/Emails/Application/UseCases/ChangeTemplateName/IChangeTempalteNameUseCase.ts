import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * Interface for the change template name use case.
 */
export default interface IChangeTemplateNameUseCase {
    /**
     * Changes the name of an email template.
     * @param templateId The ID of the email template.
     * @param newName The new name of the email template.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    Execute(templateId: string, newName: string): Promise<Result<void, EmailTemplateErrors>>;
}   