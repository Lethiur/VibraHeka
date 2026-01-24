import { IAddAttachmentToTemplateUseCase } from "@admin/emailTempaltes/Application/UseCases/AddAttachment/IAddAttachmentToTemplateUseCase";
import EmailTemplateRepositoryImpl from "@admin/emailTempaltes/Data/Repositories/EmailTemplateRepositoryImpl";
import IEmailTemplateRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateRepository";
import EmailTemplateDatasource from "@admin/emailTempaltes/Data/Datasources/EmailTemplateDatasource";
import AddAttachmentToTemplateUseCaseImpl from "@admin/emailTempaltes/Application/UseCases/AddAttachment/AddAttachmentToTemplateUseCaseImpl";

/**
 * @description Composition root for the add attachment to template use case.
 */
const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const addAttachmentToTemplateUseCase: IAddAttachmentToTemplateUseCase = new AddAttachmentToTemplateUseCaseImpl(repository);

export default addAttachmentToTemplateUseCase;     