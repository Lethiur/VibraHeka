import CreateTemplateSkeletonUseCase from "@admin/emailTemplates/Domain/Composition/CreateTemplateSkeletonComposition";
import { createContext } from "react";
import { ICreateTemplateSkeletonUseCase } from "@admin/emailTemplates/Application/UseCases/CreateTemplateEskeleton/ICreateTemplateSkeletonUseCase";


export const CreateTemplateSkeletonContext = createContext<ICreateTemplateSkeletonUseCase>(CreateTemplateSkeletonUseCase);