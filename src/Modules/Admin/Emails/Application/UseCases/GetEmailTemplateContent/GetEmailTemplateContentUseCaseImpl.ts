import { Result } from "neverthrow";
import { IGetEmailTemplateContentUseCase } from "@admin/emailTempaltes/Application/UseCases/GetEmailTemplateContent/IGetEmailTemplateContentUseCase";
import IEmailTemplateContentRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateContentRepository";
import IEmailTemplateRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateRepository";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";

/**
 * Implementation of the get email template content use case.
 */
export default class GetEmailTemplateUseCaseContentImpl implements IGetEmailTemplateContentUseCase {
    /**
     * Creates an instance of GetEmailTemplateContentImpl.
     * @param ContentRepository The repository for email template content.
     * @param TemplateRepository The repository for email templates.
     */
    constructor(private ContentRepository: IEmailTemplateContentRepository, private TemplateRepository: IEmailTemplateRepository) { }

    /**
     * Executes the use case.
     * @param templateID The ID of the email template.
     * @returns A promise that resolves to a `Result` object containing either the email template content or an error message.
     */
    public async execute(templateID: string): Promise<Result<string, EmailTemplateErrors>> {
        const templateResult: Result<string, string> = await this.TemplateRepository.GetTemplateContentUrl(templateID);

        if (templateResult.isErr()) {
            return templateResult.mapErr((error) => error as EmailTemplateErrors);
        }

        return (await this.ContentRepository.GetEmailTemplateContent(templateResult.value)).mapErr((error) => error as EmailTemplateErrors);
    }
}