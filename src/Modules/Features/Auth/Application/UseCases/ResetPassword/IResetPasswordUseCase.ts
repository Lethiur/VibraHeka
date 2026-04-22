import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ResetPasswordData } from "@auth/Domain/Entities/ResetPasswordData";

export interface IResetPasswordUseCase {
    execute(data: ResetPasswordData): Promise<Result<void, AuthErrorCodes>>;
}
