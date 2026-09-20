import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ILoginUserUseCase } from "@auth/Application/UseCases/LoginUser/ILoginUserUseCase";
import { IAuthRepository } from "@auth/Domain/Repositories/IAuthRepository";
import LoginUserDataValidator from "@auth/Application/Validators/LoginUserDataValidator";
import { ValidationErrors } from "fluentvalidation-ts";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { LoginCommand } from "@auth/Domain/Commands/LoginCommand.ts";
import { AuthenticationResult } from "@auth/Domain/ValueObjects/AuthenticationResult.ts";
import { jwtDecode, JwtPayload } from "jwt-decode";


/**
 * Use case class for handling user login functionality.
 *
 * This class implements the ILoginUserUseCase interface and provides the
 * execution logic for validating and processing a user login via the
 * associated authentication repository.
 */
export default class LoginUserUseCase implements ILoginUserUseCase {

    constructor(private AuthRepository: IAuthRepository, private LoginValidator: LoginUserDataValidator, private LocalStorageService: LocalStorageService) { }

    /**
     * Executes the login operation by validating the provided login data
     * and invoking the authentication repository.
     *
     * @param {LoginData} data - The login data containing credentials required for authentication.
     * @return {Promise<Result<LoginResult, AuthErrorCodes>>} A promise that resolves with the result of the login operation,
     * either successful login information or authentication error codes.
     * @throws {InvalidEntityError} If the provided login data is invalid based on validation errors.
     */
    public async execute(data: LoginCommand): Promise<Result<AuthenticationResult, AuthErrorCodes>> {
        const validate: ValidationErrors<LoginCommand> = this.LoginValidator.validate(data);

        if (Object.keys(validate).length > 0) {
            throw new InvalidEntityError(validate);
        }

        const loginResult: Result<AuthenticationResult, AuthErrorCodes> = await this.AuthRepository.Login(data);



        if (loginResult.isOk()) {
            const userId = jwtDecode<JwtPayload>(loginResult.value.accessToken).sub;
            if (userId) {
                this.LocalStorageService.setString(STORAGE_KEYS.USER_ID, userId);
            }
            this.LocalStorageService.setString(STORAGE_KEYS.EMAIL, data.email);
            this.LocalStorageService.setString(STORAGE_KEYS.ROLE, loginResult.value.role.toString())
            this.LocalStorageService.setString(STORAGE_KEYS.REFRESH_TOKEN, loginResult.value.refreshToken);
            this.LocalStorageService.setString(STORAGE_KEYS.AUTH_TOKEN, loginResult.value.accessToken);
        }

        return loginResult;
    }

}
