import { Result } from "neverthrow";
import { AuthErrorCodes } from "../../../Domain/Errors/AuthErrorCodes.ts";
import { LoginData } from "../../../Domain/Models/LoginData.ts";
import { LoginResult } from "../../../Domain/Models/LoginResult.ts";
import {ILoginUserUseCase} from "./ILoginUserUseCase.ts";
import {IAuthRepository} from "../../../Domain/Repositories/IAuthRepository.ts";
import LoginUserDataValidator from "../../Validators/LoginUserDataValidator.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "../../Errors/InvalidEntityError.ts";

/**
 * Use case class for handling user login functionality.
 *
 * This class implements the ILoginUserUseCase interface and provides the
 * execution logic for validating and processing a user login via the
 * associated authentication repository.
 */
export default class LoginUserUseCase implements ILoginUserUseCase {
    
    constructor(private AuthRepository : IAuthRepository, private LoginValidator : LoginUserDataValidator) { }

    /**
     * Executes the login operation by validating the provided login data
     * and invoking the authentication repository.
     *
     * @param {LoginData} data - The login data containing credentials required for authentication.
     * @return {Promise<Result<LoginResult, AuthErrorCodes>>} A promise that resolves with the result of the login operation,
     * either successful login information or authentication error codes.
     * @throws {InvalidEntityError} If the provided login data is invalid based on validation errors.
     */
    public async execute(data: LoginData): Promise<Result<LoginResult, AuthErrorCodes>> {
        const validate : ValidationErrors<LoginData> = this.LoginValidator.validate(data);
        
        if (Object.keys(validate).length > 0) {
            throw new InvalidEntityError(validate);
        }
        
        return await this.AuthRepository.Login(data);
    }
    
}