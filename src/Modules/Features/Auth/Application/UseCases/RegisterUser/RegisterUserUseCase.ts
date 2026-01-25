import {Result} from "neverthrow";

import {IRegisterUserUseCase} from "./IRegisterUserUseCase";

import {IAuthRepository} from "../../../Domain/Repositories/IAuthRepository";
import {RegistrationResult} from "../../../Domain/Models/RegistrationResult";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes";
import {RegistrationData} from "../../../Domain/Models/RegistrationData";
import RegistrationDataValidator from "../../Validators/RegistrationDataValidator";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";

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