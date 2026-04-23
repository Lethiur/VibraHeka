import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ForgotPasswordData } from "@auth/Domain/Entities/ForgotPasswordData";

export interface IForgotPasswordUseCase {
    execute(data: ForgotPasswordData): Promise<Result<void, AuthErrorCodes>>;
}
