import EmailTemplateDatasource from "@admin/emailTempaltes/Data/Datasources/EmailTemplateDatasource";
import IEmailTemplateRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateRepository";
import IChangeTemplateNameUseCase from "@admin/emailTempaltes/Application/UseCases/ChangeTemplateName/IChangeTempalteNameUseCase";
import ChangeTemplateNameUseCaseImpl from "@admin/emailTempaltes/Application/UseCases/ChangeTemplateName/ChangeTemplateNameUseCaseImpl";
import EmailTemplateRepositoryImpl from "@admin/emailTempaltes/Data/Repositories/EmailTemplateRepositoryImpl";


const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const changeTemplateNameUseCase: IChangeTemplateNameUseCase = new ChangeTemplateNameUseCaseImpl(repository);

export default changeTemplateNameUseCase;