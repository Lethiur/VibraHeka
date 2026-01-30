import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * Interface for the change template content use case.
 */
export default interface IChangeTemplateContentUseCase {
    /**
     * Changes the content of an email template.
     * @param templateId The ID of the email template.
     * @param newContent The new content of the email template.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    Execute(templateId: string, newContent: File): Promise<Result<void, EmailTemplateErrors>>;
}   