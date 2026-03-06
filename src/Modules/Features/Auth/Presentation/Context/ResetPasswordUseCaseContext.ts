import { Context, createContext } from "react";
import { IResetPasswordUseCase } from "@auth/Application/UseCases/ResetPassword/IResetPasswordUseCase";
import { resetPasswordUseCase } from "@core/Domain/Composition/AuthComposition";

export const ResetPasswordUseCaseContext: Context<IResetPasswordUseCase> = createContext(resetPasswordUseCase);


