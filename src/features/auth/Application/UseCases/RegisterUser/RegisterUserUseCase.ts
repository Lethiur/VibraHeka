import {Result} from "neverthrow";

import {IRegisterUserUseCase} from "./IRegisterUserUseCase.ts";

import {IAuthRepository} from "../../../Domain/Repositories/IAuthRepository.ts";
import {RegistrationResult} from "../../../Domain/Models/RegistrationResult.ts";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes.ts";
import {RegistrationData} from "../../../Domain/Models/RegistrationData.ts";
import RegistrationDataValidator from "../../Validators/RegistrationDataValidator.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "../../Errors/InvalidEntityError.ts";

export default class RegisterUserUseCase implements IRegisterUserUseCase {
    
    constructor(private AuthRepository : IAuthRepository, private RegisterValidator : RegistrationDataValidator) { }
    
    execute(registrationData : RegistrationData): Promise<Result<RegistrationResult, AuthErrorCodes>> {
        
        const validationResult : ValidationErrors<RegistrationData> = this.RegisterValidator.validate(registrationData);
        if(Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }
        
        return this.AuthRepository.Register(registrationData);
    }
    
}