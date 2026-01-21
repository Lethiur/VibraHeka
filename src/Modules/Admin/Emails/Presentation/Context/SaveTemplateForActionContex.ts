import { createContext } from "react";
import SaveTemplateForActionUseCase from "@admin/emailTempaltes/Domain/Composition/SaveTemplateForActionComposition";
import ISaveTemplateForActionUseCase from "@admin/emailTempaltes/Application/UseCases/SaveTemplateForAction/ISaveTemplateForActionUseCase";


export const SaveTemplateForActionContext = createContext<ISaveTemplateForActionUseCase>(SaveTemplateForActionUseCase);