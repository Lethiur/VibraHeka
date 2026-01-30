import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import IChangeTemplateContentUseCase from "@admin/emailTemplates/Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";

/**
 * Implementation of the change template content use case.
 */
export default class ChangeTemplateContentUseCaseImpl implements IChangeTemplateContentUseCase {
    constructor(private repository: IEmailTemplateRepository) { }

    /**
     * Changes the content of an email template.
     * @param templateId The ID of the email template.
     * @param newContent The new content of the email template.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    public async Execute(templateId: string, newContent: File): Promise<Result<void, EmailTemplateErrors>> {
        return this.repository.EditTemplateContent(templateId, newContent);
    }
}