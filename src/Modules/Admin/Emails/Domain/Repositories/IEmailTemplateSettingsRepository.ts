import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";
import { Result } from "neverthrow";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";


/**
 * Interface for the email template settings repository.
 */
export default interface IEmailTemplateSettingsRepository {
    /**
     * Gets the templates settings.
     * @returns {Promise<Result<EmailTemplateForAction[], EmailTemplateErrors>>} The templates settings.
     */
    GetTemplatesSettings(): Promise<Result<EmailTemplateForAction[], EmailTemplateErrors>>;

    /**
     * Saves the template settings.
     * @param {EmailTemplateForAction} EmaiLTemplateForAction - The template settings to save.
     * @returns {Promise<Result<void, EmailTemplateErrors>>} The result of the save operation.
     */
    SaveTemplate(EmaiLTemplateForAction: EmailTemplateForAction): Promise<Result<void, EmailTemplateErrors>>;
}