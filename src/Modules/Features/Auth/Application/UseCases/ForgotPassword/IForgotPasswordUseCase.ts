import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ForgotPasswordCommand } from "@auth/Domain/Commands/ForgotPasswordCommand.ts";

export interface IForgotPasswordUseCase {
    execute(data: ForgotPasswordCommand): Promise<Result<void, AuthErrorCodes>>;
}
