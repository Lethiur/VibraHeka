import {VerificationData} from "../../../Domain/Models/VerificationData.ts";
import {Result} from "neverthrow";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes.ts";

/**
 * Interface representing the use case for verifying user authenticity.
 */
export interface IVerifyUserUseCase {

    /**
     * Executes the verification process using the provided verification data.
     *
     * @param {VerificationData} verificationData - The data required for the verification process.
     * @return {Promise<void>} A promise that resolves when the operation is complete.
     */
    Execute(verificationData: VerificationData): Promise<Result<void, AuthErrorCodes>>;
}