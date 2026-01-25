import { createContext } from "react";
import { IGetEmailTemplateContentUseCase } from "@admin/emailTemplates/Application/UseCases/GetEmailTemplateContent/IGetEmailTemplateContentUseCase";
import getTemplateContentUseCase from "@admin/emailTemplates/Domain/Composition/GetTemplateContentComposition";


export const GetEmailTemplateContentContext = createContext<IGetEmailTemplateContentUseCase>(getTemplateContentUseCase);