import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";
import IEmailTemplateRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateRepository";
import IChangeTemplateContentUseCase from "@admin/emailTempaltes/Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";

/**
 * @description Implementation of the change template content use case.
 */
export default class ChangeTemplateContentUseCaseImpl implements IChangeTemplateContentUseCase {
    constructor(private repository: IEmailTemplateRepository) { }

    /**
     * @description Changes the content of an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {File} newContent - The new content of the email template.
     * @returns {Promise<Result<void, EmailTemplateErrors>>}
     */
    public async Execute(templateId: string, newContent: File): Promise<Result<void, EmailTemplateErrors>> {
        return this.repository.EditTemplateContent(templateId, newContent);
    }
}