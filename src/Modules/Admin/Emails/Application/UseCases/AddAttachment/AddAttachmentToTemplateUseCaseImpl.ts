import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import { IAddAttachmentToTemplateUseCase } from "@/Modules/Admin/Emails/Application/UseCases/AddAttachment/IAddAttachmentToTemplateUseCase";

export default class AddAttachmentToTemplateUseCaseImpl implements IAddAttachmentToTemplateUseCase {
    constructor(private repository: IEmailTemplateRepository) { }

    /**
     * @description Adds an attachment to an email template.
     * @param {string} templateId - The ID of the email template.
     * @param {File} file - The file to add as an attachment.
     * @param {string} attachmentName - The name of the attachment.
     * @returns {Promise<Result<void, EmailTemplateErrors>>}
     */
    public async Execute(templateId: string, file: File, attachmentName: string): Promise<Result<string, EmailTemplateErrors>> {
        return this.repository.AddAttachment(templateId, file, attachmentName);
    }
}