import { createContext } from "react";
import GetAllTemplatesUseCase from "@admin/emailTemplates/Domain/Composition/GetEmailTemplatesComposition";
import { IGetAllTemplatesUseCase } from "@admin/emailTemplates/Application/UseCases/GetAllTemplates/IGetAllTemplatesUseCase";


export const GetEmailTemplatsContext = createContext<IGetAllTemplatesUseCase>(GetAllTemplatesUseCase);