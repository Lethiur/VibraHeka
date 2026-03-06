import { Context, createContext } from "react";
import { IForgotPasswordUseCase } from "@auth/Application/UseCases/ForgotPassword/IForgotPasswordUseCase";
import { forgotPasswordUseCase } from "@core/Domain/Composition/AuthComposition";

export const ForgotPasswordUseCaseContext: Context<IForgotPasswordUseCase> = createContext(forgotPasswordUseCase);

