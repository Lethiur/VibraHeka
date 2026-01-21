import GetTemplatesForActionUseCaseImpl from "@admin/emailTempaltes/Application/UseCases/GetTemplatesForAction/GetTemplatesForActionUseCaseImpl";
import EmailTemplateSettingsRepositoryImpl from "@admin/emailTempaltes/Data/Repositories/EmailTemplateSettingsRepositoryImpl";
import EmailTemplatesSettingsDatasource from "@admin/emailTempaltes/Data/Datasources/EmailTemplatesSettingsDatasource";



const datasource: EmailTemplatesSettingsDatasource = new EmailTemplatesSettingsDatasource();
const repository: EmailTemplateSettingsRepositoryImpl = new EmailTemplateSettingsRepositoryImpl(datasource);
const GetTemplatesForActionUseCase: GetTemplatesForActionUseCaseImpl = new GetTemplatesForActionUseCaseImpl(repository);

export default GetTemplatesForActionUseCase;