import { Result } from "neverthrow";
import { EmailTemplate } from "@admin/emailTemplates/Domain/Models/EmailTemplate";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * Interface for the get all templates use case.
 */
export interface IGetAllTemplatesUseCase {

    /**
     * Executes the get all templates use case.
     * @returns A promise that resolves to a Result object containing either the email templates or an error message.
     */
    execute(): Promise<Result<EmailTemplate[], EmailTemplateErrors>>;
}