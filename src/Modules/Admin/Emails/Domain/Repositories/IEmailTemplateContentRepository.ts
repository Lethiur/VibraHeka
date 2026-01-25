

import { Result } from "neverthrow";

/**
 * Interface for email template content repository.
 */
export default interface IEmailTemplateContentRepository {

    /**
     * Gets the content of an email template.
     * @param templateID The ID of the email template.
     * @returns A promise that resolves to a `Result` object containing either the email template content or an error message.
     */
    GetEmailTemplateContent(templateID: string): Promise<Result<string, EmailTemplateErrors>>;
}