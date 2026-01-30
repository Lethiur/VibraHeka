
import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";

/**
 * Datasource for email template content.
 */
export default class EmailTemplateContentDatasource extends BackendDatasource {
    constructor() {
        super();
    }

    /**
     * Gets the content of an email template.
     * @param templateID The ID of the email template.
     * @returns A promise that resolves to a `Result` object containing either the email template content or an error message.
     */
    public async GetEmailTemplateContent(templateID: string): Promise<Result<string, string>> {
        return this.get<string>(`email-templates/contents?templateID=${templateID}`, true);
    }
}