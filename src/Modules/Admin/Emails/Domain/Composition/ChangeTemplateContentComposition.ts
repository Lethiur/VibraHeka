import EmailTemplateDatasource from "@admin/emailTemplates/Data/Datasources/EmailTemplateDatasource";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import IChangeTemplateContentUseCase from "@admin/emailTemplates/Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";
import ChangeTemplateContentUseCaseImpl from "@admin/emailTemplates/Application/UseCases/ChangeTemplateContent/ChangeTemplateContentUseCaseImpl";
import EmailTemplateRepositoryImpl from "@admin/emailTemplates/Data/Repositories/EmailTemplateRepositoryImpl";

/**
 * Composition root for the change template content use case.
 */
const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const changeTemplateContentUseCase: IChangeTemplateContentUseCase = new ChangeTemplateContentUseCaseImpl(repository);

export default changeTemplateContentUseCase;