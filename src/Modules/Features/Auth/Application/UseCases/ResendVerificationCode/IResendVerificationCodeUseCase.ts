import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { Result } from "neverthrow";

/**
 * Interface representing a use case for resending a verification code.
 */
export interface IResendVerificationCodeUseCase {
    /**
     * Resends the verification code to the specified email address.
     *
     * @param {string} email - The email address to resend the verification code to.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    Execute(email: string): Promise<Result<void, AuthErrorCodes>>;
}