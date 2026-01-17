import { Result } from "neverthrow";
import IEmailTemplateRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateRepository";
import { EmailTemplate } from "@admin/emailTempaltes/Domain/Models/EmailTemplate";
import { IGetAllTemplatesUseCase } from "./IGetAllTemplatesUseCase";
import { EmailTemplateErrors } from "@admin/emailTempaltes/Domain/Errors/EmailTemplateErrors";

/**
 * Implementation of the get all templates use case.
 */
export default class GetAllTemplatesUseCaseImpl implements IGetAllTemplatesUseCase {

    constructor(private repository: IEmailTemplateRepository) {
    }

    /**
     * Gets all email templates.
     * @returns A promise that resolves to a Result object containing either the email templates or an error message.
     */
    public async execute(): Promise<Result<EmailTemplate[], EmailTemplateErrors>> {
        return this.repository.GetAllTemplates();
    }
}