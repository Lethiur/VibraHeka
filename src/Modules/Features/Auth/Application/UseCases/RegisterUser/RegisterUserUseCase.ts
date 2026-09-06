import { Result } from "neverthrow";

import { IRegisterUserUseCase } from "./IRegisterUserUseCase";

import { IAuthRepository } from "../../../Domain/Repositories/IAuthRepository";
import { RegistrationResult } from "../../../Domain/Entities/RegistrationResult";
import { AuthErrorCodes } from "../../../Domain/Errors/AuthErrorCodes";
import RegistrationDataValidator from "../../Validators/RegistrationDataValidator";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { sanitizePasswordInput } from "@core/Application/Validation/PasswordInput";
import {RegistrationCommand} from "@auth/Domain/Commands/RegistrationCommand.ts";

export default class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(private AuthRepository: IAuthRepository, private RegisterValidator: RegistrationDataValidator) { }

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
