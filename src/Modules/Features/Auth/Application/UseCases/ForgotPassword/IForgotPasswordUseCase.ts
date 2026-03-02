import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ForgotPasswordData } from "@auth/Domain/Models/ForgotPasswordData";

export interface IForgotPasswordUseCase {
    execute(data: ForgotPasswordData): Promise<Result<void, AuthErrorCodes>>;
}
