import EmailTemplateDatasource from "@admin/emailTemplates/Data/Datasources/EmailTemplateDatasource";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import IChangeTemplateNameUseCase from "@admin/emailTemplates/Application/UseCases/ChangeTemplateName/IChangeTempalteNameUseCase";
import ChangeTemplateNameUseCaseImpl from "@admin/emailTemplates/Application/UseCases/ChangeTemplateName/ChangeTemplateNameUseCaseImpl";
import EmailTemplateRepositoryImpl from "@admin/emailTemplates/Data/Repositories/EmailTemplateRepositoryImpl";


const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const changeTemplateNameUseCase: IChangeTemplateNameUseCase = new ChangeTemplateNameUseCaseImpl(repository);

export default changeTemplateNameUseCase;