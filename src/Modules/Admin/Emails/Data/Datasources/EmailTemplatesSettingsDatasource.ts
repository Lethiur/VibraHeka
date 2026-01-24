import BackendDatasource from "@/Core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import { EmailTemplateForActionDTO } from "@admin/emailTempaltes/Data/DTOs/EmailTemplateForActionDTO";

/**
 * Data source for email templates settings.
 */
export default class EmailTemplatesSettingsDatasource extends BackendDatasource {

    /**
     * Gets the templates settings.
     * @returns {Promise<Result<EmailTemplateForActionDTO[], string>>} The templates settings.
     */
    public async GetTemplatesSettings(): Promise<Result<EmailTemplateForActionDTO[], string>> {
        return this.get<EmailTemplateForActionDTO[]>('/settings/all-templates', true);
    }

    /**
     * Saves the template for action.
     * @param {EmailTemplateForActionDTO} request - The request object containing the template ID and action type.
     * @returns {Promise<Result<void, string>>} The result of the save operation.
     */
    public async SaveTemplateForAction(request: EmailTemplateForActionDTO): Promise<Result<void, string>> {
        return this.patch<void>('/settings/ChangeTemplate', request, true);
    }
}