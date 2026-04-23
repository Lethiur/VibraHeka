import { RegistrationRequest } from "../Requests/RegistrationRequest";
import { RegisterResponseDTO } from "../Entities/RegistrationResponseDTO";
import AuthDatasource from "../Datasources/AuthDatasource";
import { AuthErrorCodes } from "../../Domain/Errors/AuthErrorCodes";
import { RegistrationResult } from "../../Domain/Entities/RegistrationResult";
import { Result } from "neverthrow";
import { IAuthRepository } from "../../Domain/Repositories/IAuthRepository";
import { RegistrationData } from "../../Domain/Entities/RegistrationData";
import { VerificationData } from "../../Domain/Entities/VerificationData";
import { VerificationRequest } from "../Requests/VerificationRequest";
import { LoginData } from "../../Domain/Entities/LoginData";
import { LoginResult } from "../../Domain/Entities/LoginResult";
import { LoginResultDTO } from "../Entities/LoginResultDTO";
import { LoginRequest } from "../Requests/LoginRequest";
import { ForgotPasswordData } from "../../Domain/Entities/ForgotPasswordData";
import { ResetPasswordData } from "../../Domain/Entities/ResetPasswordData";
import { ResetPasswordRequest } from "../Requests/ResetPasswordRequest";

export class AuthRepositoryImpl implements IAuthRepository {

    constructor(private datasource: AuthDatasource) {
    }

    /**
     * Authenticates a user based on the provided login data.
     *
     * @param {LoginData} data - The login credentials and associated information required for authentication.
     * @return {Promise<Result<LoginResult, AuthErrorCodes>>} A promise that resolves to the result of the login operation,
     * containing either the login result data or authentication error codes.
     */
    public async Login(data: LoginData): Promise<Result<LoginResult, AuthErrorCodes>> {
        const dto: LoginRequest = {
            email: data.Email,
            password: data.Password,
        }

        const result: Result<LoginResultDTO, string> = await this.datasource.Login(dto);

        return result.map<LoginResult>((loginResult) => ({
            UserID: loginResult.userID,
            Token: loginResult.accessToken,
            RefreshToken: loginResult.refreshToken,
            Role: loginResult.role,
        })).mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Verifies the provided data to determine its authenticity or validity.
     *
     * @param {VerificationData} data - The data to be verified.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with a result indicating success or failure, or an error code if verification fails.
     */
    public async Verify(data: VerificationData): Promise<Result<void, AuthErrorCodes>> {
        const dto: VerificationRequest = {
            email: data.Email,
            code: data.Code
        };

        const result: Result<void, string> = await this.datasource.Verify(dto);

        return result.mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Registers a new user with the provided registration data.
     *
     * @param {RegistrationData} data - The registration data containing the user's email, password, and full name.
     * @return {Promise<Result<RegistrationResult, AuthErrorCodes>>} A promise that resolves to a result containing either the registration result or an authentication error code.
     */
    public async Register(data: RegistrationData): Promise<Result<RegistrationResult, AuthErrorCodes>> {
        const request: RegistrationRequest = {
            email: data.Email,
            password: data.Password,
            firstName: data.FirstName,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        const result: Result<RegisterResponseDTO, string> = await this.datasource.register(request);

        return result.map((value) => ({
            UserId: value.userId,
            NeedsConfirmation: value.needsConfirmation,
        })).mapErr((error) => error as AuthErrorCodes);
    }

    /**
     * Resends the verification code to the specified email address.
     *
     * @param {string} email - The email address to resend the verification code to.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    public async ResendVerificationCode(email: string): Promise<Result<void, AuthErrorCodes>> {
        const result: Result<void, string> = await this.datasource.ResendVerificationCode(email);

        return result.mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Starts the forgot-password flow for the given email.
     *
     * @param {ForgotPasswordData} data - The data needed to request password recovery.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with success or an auth error code.
     */
    public async ForgotPassword(data: ForgotPasswordData): Promise<Result<void, AuthErrorCodes>> {
        const result: Result<void, string> = await this.datasource.ForgotPassword(data.Email);
        return result.mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Completes forgot-password confirmation with token and new password.
     *
     * @param {ResetPasswordData} data - The values required to set the new password.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with success or an auth error code.
     */
    public async ResetPassword(data: ResetPasswordData): Promise<Result<void, AuthErrorCodes>> {
        const request: ResetPasswordRequest = {
            encryptedToken: data.EncryptedToken,
            newPassword: data.NewPassword,
            newPasswordConfirmation: data.NewPasswordConfirmation
        };

        const result: Result<void, string> = await this.datasource.ConfirmForgotPassword(request);
        return result.mapErr(error => error as AuthErrorCodes);
    }

}
