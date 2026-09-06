import {Result} from "neverthrow";
import {RegistrationResult} from "../../../Domain/Entities/RegistrationResult";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes";
import {RegistrationCommand} from "@auth/Domain/Commands/RegistrationCommand.ts";


export interface IRegisterUserUseCase
{

    /**
     * Executes the registration process based on the provided registration data.
     *
     * @param {RegistrationCommand} registrationData - The data required to complete the registration process.
     * @return {Promise<Result<RegistrationResult, AuthErrorCodes>>} A promise that resolves with the result of the registration process,
     * which can be either a successful result or an error code indicating the specific failure.
     */
    execute(registrationData : RegistrationCommand): Promise<Result<RegistrationResult, AuthErrorCodes>>;
}