import { resendVerificationCodeUseCase } from "@core/Domain/Composition/AuthComposition";
import { Context, createContext } from "react";
import { IResendVerificationCodeUseCase } from "@auth/Application/UseCases/ResendVerificationCode/IResendVerificationCodeUseCase";

export const ResendVerificationCodeContext: Context<IResendVerificationCodeUseCase> = createContext(resendVerificationCodeUseCase);

