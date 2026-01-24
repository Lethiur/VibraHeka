import { Result } from "neverthrow";

/**
 * Interface for the get email template content use case.
 */
export interface IGetEmailTemplateContentUseCase {
    /**
     * Executes the use case.
     * @param templateID The ID of the email template.
     * @returns A promise that resolves to a `Result` object containing either the email template content or an error message.
     */
    execute(templateID: string): Promise<Result<string, string>>;
}