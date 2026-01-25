import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import IChangeTemplateNameUseCase from "@admin/emailTemplates/Application/UseCases/ChangeTemplateName/IChangeTempalteNameUseCase";

/**
 * @description Implementation of the change template name use case.
 */
export default class ChangeTemplateNameUseCaseImpl implements IChangeTemplateNameUseCase {
    constructor(private repository: IEmailTemplateRepository) { }

    /**
     * @description Changes the name of an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {string} newName - The new name of the email template.
     * @returns {Promise<Result<void, EmailTemplateErrors>>}
     */
    public async Execute(templateId: string, newName: string): Promise<Result<void, EmailTemplateErrors>> {
        return this.repository.ChangeTemplateName(templateId, newName);
    }
}   