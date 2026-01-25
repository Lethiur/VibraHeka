import IEmailTemplateSettingsRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateSettingsRepository";
import EmailTemplatesSettingsDatasource from "@admin/emailTemplates/Data/Datasources/EmailTemplatesSettingsDatasource";
import { EmailTemplateForAction } from "@admin/emailTemplates/Domain/Models/EmailTemplateForAction";
import { Result } from "neverthrow";
import { ActionType } from "@admin/emailTemplates/Domain/Models/ActionType";
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";


/**
 * Implementation of the email template settings repository.
 */
export default class EmailTemplateSettingsRepositoryImpl implements IEmailTemplateSettingsRepository {

    /**
     * The datasource.
     */
    private readonly Datasource: EmailTemplatesSettingsDatasource;

    constructor(datasource: EmailTemplatesSettingsDatasource) {
        this.Datasource = datasource;
    }

    /**
     * Gets the templates settings.
     * @returns {Promise<Result<EmailTemplateForAction[], EmailTemplateErrors>>} The templates settings.
     */
    public async GetTemplatesSettings(): Promise<Result<EmailTemplateForAction[], EmailTemplateErrors>> {
        const result = await this.Datasource.GetTemplatesSettings();
        return result.map((templates) => templates.map((template) => ({
            TemplateID: template.templateID,
            ActionType: template.actionType as ActionType
        } as EmailTemplateForAction))).mapErr((error) => error as EmailTemplateErrors);
    }

    /**
     * Saves the template for action.
     * @param EmaiLTemplateForAction The template for action to save.
     * @returns {Promise<Result<void, EmailTemplateErrors>>} The result of the save operation.
     */
    public async SaveTemplate(EmaiLTemplateForAction: EmailTemplateForAction): Promise<Result<void, EmailTemplateErrors>> {
        const result = await this.Datasource.SaveTemplateForAction({
            actionType: EmaiLTemplateForAction.ActionType,
            templateID: EmaiLTemplateForAction.TemplateID
        });
        return result.mapErr((error) => error as EmailTemplateErrors);
    }
}