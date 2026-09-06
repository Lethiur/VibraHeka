import {Result} from "neverthrow";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes";
import {VerificationCommand} from "@auth/Domain/Commands/VerificationCommand.ts";

/**
 * Interface representing the use case for verifying user authenticity.
 */
export interface IVerifyUserUseCase {

    /**
     * Executes the verification process using the provided verification data.
     *
     * @param {VerificationCommand} verificationData - The data required for the verification process.
     * @return {Promise<void>} A promise that resolves when the operation is complete.
     */
    Execute(verificationData: VerificationCommand): Promise<Result<void, AuthErrorCodes>>;
}