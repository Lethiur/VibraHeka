import { createContext } from "react";
import GetAllTemplatesUseCase from "@admin/emailTempaltes/Domain/Composition/GetEmailTemplatesComposition";
import { IGetAllTemplatesUseCase } from "@admin/emailTempaltes/Application/UseCases/GetAllTemplates/IGetAllTemplatesUseCase";


export const GetEmailTemplatsContext = createContext<IGetAllTemplatesUseCase>(GetAllTemplatesUseCase);