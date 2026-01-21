import { Result } from "neverthrow";
import { EmailTemplateForAction } from "@admin/emailTempaltes/Domain/Models/EmailTemplateForAction";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";
import ISaveTemplateForActionUseCase from "@admin/emailTempaltes/Application/UseCases/SaveTemplateForAction/ISaveTemplateForActionUseCase";
import IEmailTemplateSettingsRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateSettingsRepository";

/**
 * Implementation of the save template for action use case.
 */
export default class SaveTemplateForActionUseCaseImpl implements ISaveTemplateForActionUseCase {

    /**
     * The repository.
     */
    private readonly Repository: IEmailTemplateSettingsRepository;

    /**
     * Creates a new instance of the SaveTemplateForActionUseCaseImpl class.
     * @param repository The repository.
     */
    constructor(repository: IEmailTemplateSettingsRepository) {
        this.Repository = repository;
    }

    /**
     * Executes the save template for action use case.
     * @param template The template to save.
     * @returns A promise that resolves to a Result object containing either void or an error message.
     */
    public async execute(template: EmailTemplateForAction): Promise<Result<void, EmailTemplateErrors>> {
        return await this.Repository.SaveTemplate(template);
    }
}