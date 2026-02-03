import { Result } from "neverthrow";
import { AuthErrorCodes } from "../../../Domain/Errors/AuthErrorCodes";
import { IResendVerificationCodeUseCase } from "./IResendVerificationCodeUseCase";
import { IAuthRepository } from "../../../Domain/Repositories/IAuthRepository";

/**
 * Implementation of the ResendVerificationCodeUseCase interface.
 */
export default class ResendVerificationCodeUseCase implements IResendVerificationCodeUseCase {

    constructor(private readonly repository: IAuthRepository) { }

    /**
     * Resends the verification code to the specified email address.
     *
     * @param {string} email - The email address to resend the verification code to.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    public async Execute(email: string): Promise<Result<void, AuthErrorCodes>> {
        return this.repository.ResendVerificationCode(email);
    }
}

