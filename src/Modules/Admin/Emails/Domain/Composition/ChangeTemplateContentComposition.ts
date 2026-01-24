import EmailTemplateDatasource from "@admin/emailTempaltes/Data/Datasources/EmailTemplateDatasource";
import IEmailTemplateRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateRepository";
import IChangeTemplateContentUseCase from "@admin/emailTempaltes/Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";
import ChangeTemplateContentUseCaseImpl from "@admin/emailTempaltes/Application/UseCases/ChangeTemplateContent/ChangeTemplateContentUseCaseImpl";
import EmailTemplateRepositoryImpl from "@admin/emailTempaltes/Data/Repositories/EmailTemplateRepositoryImpl";

/**
 * @description Composition root for the change template content use case.
 */
const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const changeTemplateContentUseCase: IChangeTemplateContentUseCase = new ChangeTemplateContentUseCaseImpl(repository);

export default changeTemplateContentUseCase;