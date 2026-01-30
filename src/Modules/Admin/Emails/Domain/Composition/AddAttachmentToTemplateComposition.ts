import { IAddAttachmentToTemplateUseCase } from "@admin/emailTemplates/Application/UseCases/AddAttachment/IAddAttachmentToTemplateUseCase";
import EmailTemplateRepositoryImpl from "@admin/emailTemplates/Data/Repositories/EmailTemplateRepositoryImpl";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import EmailTemplateDatasource from "@admin/emailTemplates/Data/Datasources/EmailTemplateDatasource";
import AddAttachmentToTemplateUseCaseImpl from "@admin/emailTemplates/Application/UseCases/AddAttachment/AddAttachmentToTemplateUseCaseImpl";

/**
 * Composition root for the add attachment to template use case.
 */
const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const addAttachmentToTemplateUseCase: IAddAttachmentToTemplateUseCase = new AddAttachmentToTemplateUseCaseImpl(repository);

export default addAttachmentToTemplateUseCase;     