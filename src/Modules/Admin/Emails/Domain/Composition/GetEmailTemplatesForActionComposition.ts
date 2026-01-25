import GetTemplatesForActionUseCaseImpl from "@admin/emailTemplates/Application/UseCases/GetTemplatesForAction/GetTemplatesForActionUseCaseImpl";
import EmailTemplateSettingsRepositoryImpl from "@admin/emailTemplates/Data/Repositories/EmailTemplateSettingsRepositoryImpl";
import EmailTemplatesSettingsDatasource from "@admin/emailTemplates/Data/Datasources/EmailTemplatesSettingsDatasource";



const datasource: EmailTemplatesSettingsDatasource = new EmailTemplatesSettingsDatasource();
const repository: EmailTemplateSettingsRepositoryImpl = new EmailTemplateSettingsRepositoryImpl(datasource);
const GetTemplatesForActionUseCase: GetTemplatesForActionUseCaseImpl = new GetTemplatesForActionUseCaseImpl(repository);

export default GetTemplatesForActionUseCase;