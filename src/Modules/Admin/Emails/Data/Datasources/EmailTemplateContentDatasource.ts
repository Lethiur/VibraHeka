import ApiDatasource from "@/Core/Data/Datasources/ApiDatasource";
import { Result } from "neverthrow";

/**
 * Datasource for email template content.
 */
export default class EmailTemplateContentDatasource extends ApiDatasource {
    constructor() {
        super();
    }

    /**
     * Gets the content of an email template.
     * @param templateURL The URL of the email template.
     * @returns A promise that resolves to a `Result` object containing either the email template content or an error message.
     */
    public async GetEmailTemplateContent(templateURL: string): Promise<Result<string, string>> {
        return this.get<string>(templateURL, false);
    }
}