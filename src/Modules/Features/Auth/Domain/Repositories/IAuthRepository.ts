import { Result } from 'neverthrow';
import {RegistrationData} from "../Models/RegistrationData";
import {RegistrationResult} from "../Models/RegistrationResult";
import {AuthErrorCodes} from "../Errors/AuthErrorCodes";
import {VerificationData} from "../Models/VerificationData";
import {LoginData} from "../Models/LoginData";
import {LoginResult} from "../Models/LoginResult";

/**
 * Interface representing an authentication repository that provides methods
 * for user registration and verification.
 */
export interface IAuthRepository {

    /**
     * Registers a new user with the provided registration data.
     *
     * @param {RegistrationData} data - The registration details such as username, email, and password.
     * @return {Promise<Result<RegistrationResult, AuthErrorCodes>>} A promise that resolves to a result object containing either the registration result or an authentication error code.
     */
    Register(data: RegistrationData): Promise<Result<RegistrationResult, AuthErrorCodes>>;

    /**
     * Verifies the provided data and checks its validity.
     *
     * @param {VerificationData} data - The verification data to be validated.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves to a result object indicating whether the verification was successful or contains error codes in case of failure.
     */
    Verify(data: VerificationData): Promise<Result<void, AuthErrorCodes>>;

    /**
     * Authenticates a user based on the provided login data and returns the result of the operation.
     *
     * @param {LoginData} data - The login data containing the user's credentials and any required information for authentication.
     * @return {Promise<Result<LoginResult, AuthErrorCodes>>} A promise that resolves with the authentication result, which is either a `LoginResult` object on success or an `AuthErrorCodes` error on failure.
     */
    Login(data: LoginData) : Promise<Result<LoginResult, AuthErrorCodes>>;
}
