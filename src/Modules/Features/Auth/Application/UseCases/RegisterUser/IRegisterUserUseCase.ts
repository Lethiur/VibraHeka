import {Result} from "neverthrow";
import {RegistrationData} from "../../../Domain/Models/RegistrationData";
import {RegistrationResult} from "../../../Domain/Models/RegistrationResult";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes";


export interface IRegisterUserUseCase
{
    /**
     * Executes the primary operation of the method and returns a promise.
     *
     * @return {Promise<Result<RegistrationResult, string>>} A promise that resolves to a Result object containing a RegistrationResult on success or an error message string on failure.
     */
    execute(registrationData : RegistrationData): Promise<Result<RegistrationResult, AuthErrorCodes>>;
}