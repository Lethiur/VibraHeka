import { Result } from "neverthrow";
import { IGetTemplatesForActionUseCase } from "@admin/emailTemplates/Application/UseCases/GetTemplatesForAction/IGetTemplatesForActionUseCase";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import IEmailTemplateSettingsRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateSettingsRepository";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";

/**
 *  Implementation of the get templates for action use case.
 */
export default class GetTemplatesForActionUseCaseImpl implements IGetTemplatesForActionUseCase {

    /**
     * The repository.
     */
    private readonly repository: IEmailTemplateSettingsRepository;

    /**
     * Creates a new instance of the GetTemplatesForActionUseCaseImpl class.
     * @param repository The repository.
     */
    constructor(repository: IEmailTemplateSettingsRepository) {
        this.repository = repository;
    }

    /**
     * Executes the use case.
     * @returns A promise that resolves to a Result object containing either the email templates for action or an error message.
     */
    public async execute(): Promise<Result<EmailTemplateForAction[], EmailTemplateErrors>> {
        return await this.repository.GetTemplatesSettings();
    }
}