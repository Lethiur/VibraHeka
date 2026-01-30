import { ICreateTemplateSkeletonUseCase } from "@admin/emailTemplates/Application/UseCases/CreateTemplateEskeleton/ICreateTemplateSkeletonUseCase";
import EmailTemplateDatasource from "@admin/emailTemplates/Data/Datasources/EmailTemplateDatasource";
import EmailTemplateRepositoryImpl from "@admin/emailTemplates/Data/Repositories/EmailTemplateRepositoryImpl";
import IEmailTemplateRepository from "@admin/emailTemplates/Domain/Repositories/IEmailTemplateRepository";
import CreateTemplateSkeletonUseCaseImpl from "@admin/emailTemplates/Application/UseCases/CreateTemplateEskeleton/CreateTemplateSkeletonUseCaseImpl";
import CreateTemplateSkeletonValidator from "@admin/emailTemplates/Application/Validators/CreateTemplateSkeletonValidator";


const datasource: EmailTemplateDatasource = new EmailTemplateDatasource();
const repository: IEmailTemplateRepository = new EmailTemplateRepositoryImpl(datasource);
const CreateTemplateSkeletonUseCase: ICreateTemplateSkeletonUseCase = new CreateTemplateSkeletonUseCaseImpl(repository, new CreateTemplateSkeletonValidator());

export default CreateTemplateSkeletonUseCase;