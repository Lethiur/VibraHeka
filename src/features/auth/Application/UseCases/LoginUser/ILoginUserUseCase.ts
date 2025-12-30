import {LoginData} from "../../../Domain/Models/LoginData.ts";
import {LoginResult} from "../../../Domain/Models/LoginResult.ts";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes.ts";
import {Result} from "neverthrow";

/**
 * Represents a use case for handling user login operations.
 *
 * This interface defines a contract for processing user login requests,
 * validating credentials, and returning the result of the login operation
 * along with any authentication errors.
 *
 * Methods:
 * - `execute`: Executes the user login process with the provided data
 *   and returns a result indicating success or failure.
 *
 * @interface ILoginUserUseCase
 */
export interface ILoginUserUseCase {

    /**
     * Executes the login operation using the provided login data.
     *
     * @param {LoginData} data - The data containing the login credentials required for authentication.
     * @return {Promise<Result<LoginResult, AuthErrorCodes>>} A promise that resolves to a result object containing either the successful login result or authentication error codes.
     */
    execute(data: LoginData): Promise<Result<LoginResult, AuthErrorCodes>>;
}