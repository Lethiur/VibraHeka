import { Result } from "neverthrow";
import { IGetTemplatesForActionUseCase } from "@admin/emailTempaltes/Application/UseCases/GetTemplatesForAction/IGetTemplatesForActionUseCase";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";
import IEmailTemplateSettingsRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateSettingsRepository";
import { EmailTemplateForAction } from "@admin/emailTempaltes/Domain/Models/EmailTemplateForAction";

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