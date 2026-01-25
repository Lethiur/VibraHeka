import { Result } from "neverthrow";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * Interface for the save template for action use case.
 */
export default interface ISaveTemplateForActionUseCase {
    /**
     * Executes the save template for action use case.
     * @param template The template to save.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    execute(template: EmailTemplateForAction): Promise<Result<void, EmailTemplateErrors>>;
}