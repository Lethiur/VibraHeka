import IChangeTemplateContentUseCase from "@admin/emailTemplates/Application/UseCases/ChangeTemplateContent/IChangeTemplateContentUseCase";
import changeTemplateContentUseCase from "@admin/emailTemplates/Domain/Composition/ChangeTemplateContentComposition";

import { createContext } from "react";

export const ChangeTemplateContentContext = createContext<IChangeTemplateContentUseCase>(changeTemplateContentUseCase);