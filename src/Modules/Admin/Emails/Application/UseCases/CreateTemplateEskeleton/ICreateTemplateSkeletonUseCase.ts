import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

export interface ICreateTemplateSkeletonUseCase {

    /**
     * Creates a new email template skeleton.
     * @param templateName The name of the email template.
     * @returns A promise that resolves to a Result object containing either the ID of the new template or an error message.
     */
    Execute(templateName: string): Promise<Result<string, EmailTemplateErrors>>;
}