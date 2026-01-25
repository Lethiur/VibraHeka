import EmailTemplateDatasource from "@admin/emailTemplates/Data/Datasources/EmailTemplateDatasource";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import GetAllTemplatesUseCaseImpl from "@admin/emailTemplates/Application/UseCases/GetAllTemplates/GetAllTemplatesUseCaseImpl";
import EmailTemplateRepositoryImpl from "@admin/emailTemplates/Data/Repositories/EmailTemplateRepositoryImpl";
import { IGetAllTemplatesUseCase } from "@admin/emailTemplates/Application/UseCases/GetAllTemplates/IGetAllTemplatesUseCase";


const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const GetAllTemplatesUseCase: IGetAllTemplatesUseCase = new GetAllTemplatesUseCaseImpl(repository);

export default GetAllTemplatesUseCase;
