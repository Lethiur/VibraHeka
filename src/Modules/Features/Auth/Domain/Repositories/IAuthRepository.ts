import { Result } from 'neverthrow';
import { AuthErrorCodes } from "../Errors/AuthErrorCodes";
import { ForgotPasswordCommand } from "@auth/Domain/Commands/ForgotPasswordCommand.ts";
import {RegistrationCommand} from "@auth/Domain/Commands/RegistrationCommand.ts";
import {VerificationCommand} from "@auth/Domain/Commands/VerificationCommand.ts";
import {LoginCommand} from "@auth/Domain/Commands/LoginCommand.ts";
import {ResetPasswordCommand} from "@auth/Domain/Commands/ResetPasswordCommand.ts";
import {RegistrationResult} from "@auth/Domain/ValueObjects/RegistrationResult.ts";
import {AuthenticationResult} from "@auth/Domain/ValueObjects/AuthenticationResult.ts";

/**
 * Interface representing an authentication repository that provides methods
 * for user registration and verification.
 */
export interface IAuthRepository {

    /**
     * Registers a new user with the provided registration data.
     *
     * @param {RegistrationCommand} data - The registration details such as username, email, and password.
     * @return {Promise<Result<RegistrationResult, AuthErrorCodes>>} A promise that resolves to a result object containing either the registration result or an authentication error code.
     */
    Register(data: RegistrationCommand): Promise<Result<RegistrationResult, AuthErrorCodes>>;

    /**
     * Verifies the provided data and checks its validity.
     *
     * @param {VerificationCommand} command - The verification data to be validated.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves to a result object indicating whether the verification was successful or contains error codes in case of failure.
     */
    Verify(command: VerificationCommand): Promise<Result<void, AuthErrorCodes>>;

    /**
     * Authenticates a user based on the provided login data and returns the result of the operation.
     *
     * @param {LoginCommand} command - The login data containing the user's credentials and any required information for authentication.
     * @return {Promise<Result<AuthenticationResult, AuthErrorCodes>>} A promise that resolves with the authentication result, which is either a `AuthenticationResult` object on success or an `AuthErrorCodes` error on failure.
     */
    Login(command: LoginCommand): Promise<Result<AuthenticationResult, AuthErrorCodes>>;

    /**
     * Resends the verification code to the specified email address.
     *
     * @param {string} email - The email address to resend the verification code to.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    ResendVerificationCode(email: string): Promise<Result<void, AuthErrorCodes>>;

    /**
     * Starts the forgot-password flow by sending a recovery email to the user.
     *
     * @param {ForgotPasswordCommand} command - The payload that contains the user's email.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with success or an error code.
     */
    ForgotPassword(command: ForgotPasswordCommand): Promise<Result<void, AuthErrorCodes>>;

    /**
     * Completes the forgot-password flow by setting a new password.
     *
     * @param {ResetPasswordCommand} command - The payload containing token and new password values.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with success or an error code.
     */
    ResetPassword(command: ResetPasswordCommand): Promise<Result<void, AuthErrorCodes>>;
}
