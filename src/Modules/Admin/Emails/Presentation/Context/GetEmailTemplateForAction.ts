import { Context, createContext } from "react";
import GetTemplatesForActionUseCase from "@admin/emailTemplates/Domain/Composition/GetEmailTemplatesForActionComposition";
import { IGetTemplatesForActionUseCase } from "@admin/emailTemplates/Application/UseCases/GetTemplatesForAction/IGetTemplatesForActionUseCase";


export const GetEmailTemplateForActionContext: Context<IGetTemplatesForActionUseCase> = createContext<IGetTemplatesForActionUseCase>(GetTemplatesForActionUseCase);