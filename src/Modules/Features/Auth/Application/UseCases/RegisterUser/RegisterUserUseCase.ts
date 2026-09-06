import { Result } from "neverthrow";

import { IRegisterUserUseCase } from "./IRegisterUserUseCase";

import { IAuthRepository } from "../../../Domain/Repositories/IAuthRepository";
import { AuthErrorCodes } from "../../../Domain/Errors/AuthErrorCodes";
import RegistrationDataValidator from "../../Validators/RegistrationDataValidator";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { sanitizePasswordInput } from "@core/Application/Validation/PasswordInput";
import {RegistrationCommand} from "@auth/Domain/Commands/RegistrationCommand.ts";
import {RegistrationResult} from "@auth/Domain/ValueObjects/RegistrationResult.ts";

/**
 * Use case class for registering a new user.
 * This class encapsulates the logic for user registration, including input validation,
 * sanitization of sensitive data, and delegation to the authentication repository for registration.
 */
export default class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(private AuthRepository: IAuthRepository, private RegisterValidator: RegistrationDataValidator) { }

    /**
     * Executes the registration process for a new user.
     * This method validates the provided registration data,
     * sanitizes the password input, and communicates with the authentication repository
     * to register the user.
     *
     * @param {RegistrationCommand} registrationData - The user registration details, including username and password.
     * @return {Promise<Result<RegistrationResult, AuthErrorCodes>>} A promise that resolves to a result object containing either the registration success result or an error code indicating failure.
     * @throws {InvalidEntityError} If the provided registration data is invalid based on the validation checks.
     */
    execute(registrationData: RegistrationCommand): Promise<Result<RegistrationResult, AuthErrorCodes>> {

        const sanitizedData: RegistrationCommand = {
            ...registrationData,
            password: sanitizePasswordInput(registrationData.password),
        };

        const validationResult: ValidationErrors<RegistrationCommand> = this.RegisterValidator.validate(sanitizedData);
        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        return this.AuthRepository.Register(sanitizedData);
    }

}
