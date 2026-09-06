import { RegistrationCommand } from "@auth/Domain/Commands/RegistrationCommand.ts";
import AuthDatasource from "../Datasources/AuthDatasource";
import { AuthErrorCodes } from "../../Domain/Errors/AuthErrorCodes";
import { Result } from "neverthrow";
import { IAuthRepository } from "../../Domain/Repositories/IAuthRepository";
import { VerificationCommand } from "@auth/Domain/Commands/VerificationCommand.ts";
import { LoginCommand } from "@auth/Domain/Commands/LoginCommand.ts";
import { ForgotPasswordCommand } from "@auth/Domain/Commands/ForgotPasswordCommand.ts";
import { ResetPasswordCommand } from "@auth/Domain/Commands/ResetPasswordCommand.ts";
import {AuthenticateUserResponse, RegisterUserResponse} from "@/Generated/api/authentication";
import {mapToLoginResult, mapToRegistrationResult} from "@auth/Data/Mappers/AuthMapper.ts";
import {RegistrationResult} from "@auth/Domain/ValueObjects/RegistrationResult.ts";
import {AuthenticationResult} from "@auth/Domain/ValueObjects/AuthenticationResult.ts";

export class AuthRepositoryImpl implements IAuthRepository {

    constructor(private datasource: AuthDatasource) {
    }

    /**
     * Authenticates a user based on the provided login data.
     *
     * @param {LoginCommand} command - The login credentials and associated information required for authentication.
     * @return {Promise<Result<AuthenticationResult, AuthErrorCodes>>} A promise that resolves to the result of the login operation,
     * containing either the authentication result data or authentication error codes.
     */
    public async Login(command: LoginCommand): Promise<Result<AuthenticationResult, AuthErrorCodes>> {
        const result: Result<AuthenticateUserResponse, string> = await this.datasource.Login(command);
        return result.map<AuthenticationResult>(mapToLoginResult).mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Verifies the provided data to determine its authenticity or validity.
     *
     * @param {VerificationCommand} command - The data to be verified.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with a result indicating success or failure, or an error code if verification fails.
     */
    public async Verify(command: VerificationCommand): Promise<Result<void, AuthErrorCodes>> {
        const result: Result<void, string> = await this.datasource.Verify(command);
        return result.mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Registers a new user with the provided registration data.
     *
     * @param {RegistrationCommand} command - The registration data containing the user's email, password, and full name.
     * @return {Promise<Result<RegistrationResult, AuthErrorCodes>>} A promise that resolves to a result containing either the registration result or an authentication error code.
     */
    public async Register(command: RegistrationCommand): Promise<Result<RegistrationResult, AuthErrorCodes>> {
        const result: Result<RegisterUserResponse, string> = await this.datasource.register(command);
        return result.map(mapToRegistrationResult).mapErr((error) => error as AuthErrorCodes);
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
     * @param {ForgotPasswordCommand} command - The data needed to request password recovery.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with success or an auth error code.
     */
    public async ForgotPassword(command: ForgotPasswordCommand): Promise<Result<void, AuthErrorCodes>> {
        const result: Result<void, string> = await this.datasource.ForgotPassword(command.Email);
        return result.mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Completes forgot-password confirmation with token and new password.
     *
     * @param {ResetPasswordCommand} command - The values required to set the new password.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with success or an auth error code.
     */
    public async ResetPassword(command: ResetPasswordCommand): Promise<Result<void, AuthErrorCodes>> {
        const result: Result<void, string> = await this.datasource.ConfirmForgotPassword(command);
        return result.mapErr(error => error as AuthErrorCodes);
    }

}
