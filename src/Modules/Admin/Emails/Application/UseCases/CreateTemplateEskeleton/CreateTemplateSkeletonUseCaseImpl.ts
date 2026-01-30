import { ICreateTemplateSkeletonUseCase } from "./ICreateTemplateSkeletonUseCase";
import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import CreateTemplateSkeletonValidator from "@admin/emailTemplates/Application/Validators/CreateTemplateSkeletonValidator";
import TemplateSkeleton from "../../Entities/TemplateSkeleton";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";

/**
 * Implementation of the create template skeleton use case.
 */
export default class CreateTemplateSkeletonUseCaseImpl implements ICreateTemplateSkeletonUseCase {

    /**
     * @param Repository The repository to use for the use case.
     */
    constructor(private Repository: IEmailTemplateRepository, private Validator: CreateTemplateSkeletonValidator) {
    }

    /**
     * Creates a new email template skeleton.
     * @param templateName The name of the email template.
     * @returns A promise that resolves to a Result object containing either the ID of the new template or an error message.
     */
    public async Execute(templateName: string): Promise<Result<string, EmailTemplateErrors>> {
        const templateSkeleton = new TemplateSkeleton(templateName);
        const validationResult = this.Validator.validate(templateSkeleton);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }
        return this.Repository.CreateTemplateSkeleton(templateName);
    }
}