import { Result } from "neverthrow";
import { EmailTemplate } from "@admin/emailTempaltes/Domain/Models/EmailTemplate";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";



/**
 * Interface for the email template repository.
 */
export default interface IEmailTemplateRepository {

    /**
     * Gets all email templates.
     * @returns A promise that resolves to a Result object containing either the email templates or an error message.
     */
    GetAllTemplates(): Promise<Result<EmailTemplate[], EmailTemplateErrors>>;
}