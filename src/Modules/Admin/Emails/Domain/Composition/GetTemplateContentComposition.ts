import EmailTemplateDatasource from "../../Data/Datasources/EmailTemplateDatasource";
import IEmailTemplateRepository from "../Repositories/IEmailTemplateRepository";
import EmailTemplateRepositoryImpl from "../../Data/Repositories/EmailTemplateRepositoryImpl";
import { IGetEmailTemplateContentUseCase } from "@admin/emailTemplates/Application/UseCases/GetEmailTemplateContent/IGetEmailTemplateContentUseCase";
import GetEmailTemplateContentUseCaseImpl from "@admin/emailTemplates/Application/UseCases/GetEmailTemplateContent/GetEmailTemplateContentUseCaseImpl";
import EmailTemplateContentDatasource from "../../Data/Datasources/EmailTemplateContentDatasource";
import IEmailTemplateContentRepository from "../Repositories/IEmailTemplateContentRepository";
import EmailTemplateContentRepositoryImpl from "../../Data/Repositories/EmailTemplateContentRepositoryImpl";

const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const contentDatasource: EmailTemplateContentDatasource = new EmailTemplateContentDatasource();
const contentRepository: IEmailTemplateContentRepository = new EmailTemplateContentRepositoryImpl(contentDatasource);
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const getTemplateContentUseCase: IGetEmailTemplateContentUseCase = new GetEmailTemplateContentUseCaseImpl(contentRepository, repository);

export default getTemplateContentUseCase;