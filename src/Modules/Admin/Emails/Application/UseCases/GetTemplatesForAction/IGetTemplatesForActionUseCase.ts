import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";
import { EmailTemplateForActionDTO } from "@admin/emailTempaltes/Data/DTOs/EmailTemplateForActionDTO";

/**
 * Interface for the get templates for action use case.
 */
export interface IGetTemplatesForActionUseCase {

    /**
     * Executes the get templates for action use case.
     * @param action The action to get templates for.
     * @returns A promise that resolves to a Result object containing either the email templates for the action or an error message.
     */
    execute(action: string): Promise<Result<EmailTemplateForActionDTO[], EmailTemplateErrors>>;
}   