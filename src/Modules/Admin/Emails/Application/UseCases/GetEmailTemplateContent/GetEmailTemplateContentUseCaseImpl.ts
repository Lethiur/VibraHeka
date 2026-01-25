import { Result } from "neverthrow";
import { IGetEmailTemplateContentUseCase } from "@admin/emailTemplates/Application/UseCases/GetEmailTemplateContent/IGetEmailTemplateContentUseCase";
import IEmailTemplateContentRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateContentRepository";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

/**
 * Implementation of the get email template content use case.
 */
export default class GetEmailTemplateUseCaseContentImpl implements IGetEmailTemplateContentUseCase {
    /**
     * Creates an instance of GetEmailTemplateContentImpl.
     * @param ContentRepository The repository for email template content.
     * @param TemplateRepository The repository for email templates.
     */
    constructor(private ContentRepository: IEmailTemplateContentRepository) { }

    /**
     * Executes the use case.
     * @param templateID The ID of the email template.
     * @returns A promise that resolves to a `Result` object containing either the email template content or an error message.
     */
    public async Execute(templateID: string): Promise<Result<string, EmailTemplateErrors>> {
        const data: Result<string, EmailTemplateErrors> = await this.ContentRepository.GetEmailTemplateContent(templateID);
        return data;
    }
}