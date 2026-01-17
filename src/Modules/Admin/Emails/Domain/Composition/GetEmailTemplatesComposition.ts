import EmailTemplateDatasource from "@admin/emailTempaltes/Data/Datasources/EmailTemplateDatasource";
import IEmailTemplateRepository from "@admin/emailTempaltes/Domain/Repositories/IEmailTemplateRepository";
import GetAllTemplatesUseCaseImpl from "@admin/emailTempaltes/Application/UseCases/GetAllTemplates/GetAllTemplatesUseCaseImpl";
import EmailTemplateRepositoryImpl from "@admin/emailTempaltes/Data/Repositories/EmailTemplateRepositoryImpl";
import { IGetAllTemplatesUseCase } from "@admin/emailTempaltes/Application/UseCases/GetAllTemplates/IGetAllTemplatesUseCase";


const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const GetAllTemplatesUseCase: IGetAllTemplatesUseCase = new GetAllTemplatesUseCaseImpl(repository);

export default GetAllTemplatesUseCase;
