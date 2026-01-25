import { createContext } from "react";
import addAttachmentToTemplateUseCase from "../../Domain/Composition/AddAttachmentToTemplateComposition";

const addAttachmentToTemplateContext = createContext(addAttachmentToTemplateUseCase);

export default addAttachmentToTemplateContext;