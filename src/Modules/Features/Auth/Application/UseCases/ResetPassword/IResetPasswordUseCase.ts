import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import {ResetPasswordCommand} from "@auth/Domain/Commands/ResetPasswordCommand.ts";

/**
 * Interface representing the use case for resetting a user's password.
 */
export interface IResetPasswordUseCase {
    /**
     * Executes the reset password operation using the provided command.
     *
     * @param {ResetPasswordCommand} data - The command containing the necessary information to reset the password.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves to a result indicating success or failure with corresponding error codes.
     */
    execute(data: ResetPasswordCommand): Promise<Result<void, AuthErrorCodes>>;
}
