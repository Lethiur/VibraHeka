import { Context, createContext } from "react";
import GetTemplatesForActionUseCase from "@admin/emailTempaltes/Domain/Composition/GetEmailTemplatesForActionComposition";
import { IGetTemplatesForActionUseCase } from "@admin/emailTempaltes/Application/UseCases/GetTemplatesForAction/IGetTemplatesForActionUseCase";


export const GetEmailTemplateForActionContext: Context<IGetTemplatesForActionUseCase> = createContext<IGetTemplatesForActionUseCase>(GetTemplatesForActionUseCase);