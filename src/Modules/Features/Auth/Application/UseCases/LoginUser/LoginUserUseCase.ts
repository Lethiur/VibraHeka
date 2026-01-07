import { Result } from "neverthrow";
import { AuthErrorCodes } from "../../../Domain/Errors/AuthErrorCodes.ts";
import { LoginData } from "../../../Domain/Models/LoginData.ts";
import { LoginResult } from "../../../Domain/Models/LoginResult.ts";
import {ILoginUserUseCase} from "./ILoginUserUseCase.ts";
import {IAuthRepository} from "../../../Domain/Repositories/IAuthRepository.ts";
import LoginUserDataValidator from "../../Validators/LoginUserDataValidator.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys.ts";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService.ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError.ts";


/**
 * Use case class for handling user login functionality.
 *
 * This class implements the ILoginUserUseCase interface and provides the
 * execution logic for validating and processing a user login via the
 * associated authentication repository.
 */
export default class LoginUserUseCase implements ILoginUserUseCase {
    
    constructor(private AuthRepository : IAuthRepository, private LoginValidator : LoginUserDataValidator, private LocalStorageService : LocalStorageService) { }

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
        
        const loginResult : Result<LoginResult, AuthErrorCodes> = await this.AuthRepository.Login(data);
        
        if (loginResult.isOk())
        {
            this.LocalStorageService.setString(STORAGE_KEYS.ROLE, loginResult.value.Role.toString())
            this.LocalStorageService.setString(STORAGE_KEYS.USER_ID, loginResult.value.UserID)
            this.LocalStorageService.setString(STORAGE_KEYS.REFRESH_TOKEN, loginResult.value.RefreshToken);
            this.LocalStorageService.setString(STORAGE_KEYS.AUTH_TOKEN, loginResult.value.Token);
        }
        
        return loginResult;
    }
    
}