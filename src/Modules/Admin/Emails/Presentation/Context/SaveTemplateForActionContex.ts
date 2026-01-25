import { createContext } from "react";
import SaveTemplateForActionUseCase from "@admin/emailTemplates/Domain/Composition/SaveTemplateForActionComposition";
import ISaveTemplateForActionUseCase from "@admin/emailTemplates/Application/UseCases/SaveTemplateForAction/ISaveTemplateForActionUseCase";


export const SaveTemplateForActionContext = createContext<ISaveTemplateForActionUseCase>(SaveTemplateForActionUseCase);