import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";

/**
 * Interface for the get templates for action use case.
 */
export interface IGetTemplatesForActionUseCase {

    /**
     * Executes the get templates for action use case.
     * @returns A promise that resolves to a Result object containing either the email templates for the action or an error message.
     */
    execute(): Promise<Result<EmailTemplateForAction[], EmailTemplateErrors>>;
}   