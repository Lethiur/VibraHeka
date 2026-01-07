import { Result } from "neverthrow";
import { AuthErrorCodes } from "../../../Domain/Errors/AuthErrorCodes.ts";
import { VerificationData } from "../../../Domain/Models/VerificationData.ts";
import {IVerifyUserUseCase} from "./IVerifyUserUseCase.ts";
import {IAuthRepository} from "../../../Domain/Repositories/IAuthRepository.ts";
import VerificationDataValidator from "../../Validators/VerificationDataValidator.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError.ts";


/**
 * Implements the IVerifyUserUseCase interface to provide functionality
 * for verifying user data using a validation process and a repository.
 */
export default class VerifyUserUseCaseImpl implements IVerifyUserUseCase {

    constructor(private AuthRepository : IAuthRepository, private VerificationValidator : VerificationDataValidator) { }

    /**
     * Executes the verification process using the provided verification data.
     *
     * @param {VerificationData} verificationData - The data required for verification.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with the result of the verification process or rejects with an error.
     */
    public async Execute(verificationData: VerificationData): Promise<Result<void, AuthErrorCodes>> {
        
        let validateResult : ValidationErrors<VerificationData> = this.VerificationValidator.validate(verificationData);
        if (Object.keys(validateResult).length > 0) {
            throw new InvalidEntityError(validateResult);
        }
        
        return await this.AuthRepository.Verify(verificationData);
    }
    
}