import { Result } from "neverthrow";
import { RegisterResponseDTO } from "@auth/Data/Entities/RegistrationResponseDTO";
import { RegistrationRequest } from "@auth/Data/Requests/RegistrationRequest";
import { VerificationRequest } from "@auth/Data/Requests/VerificationRequest";
import { LoginResultDTO } from "@auth/Data/Entities/LoginResultDTO";
import { LoginRequest } from "@auth/Data/Requests/LoginRequest";
import { ResetPasswordRequest } from "@auth/Data/Requests/ResetPasswordRequest";
import BackendDatasource from "@core/Data/Datasources/BackendDatasource";

/**
 * Represents an authentication data source responsible for handling
 * authentication-related API calls, inheriting from ApiDatasource.
 */
export default class AuthDatasource extends BackendDatasource {

    /**
     * Registers a new user with the provided registration data.
     *
     * @param {RegistrationRequestDto} registrationData - The data required for registering a user.
     * @return {Promise<Result<RegisterResponseDto, string>>} A promise that resolves to a result containing either the registration response on success or an error code on failure.
     */
    public async register(registrationData: RegistrationRequest): Promise<Result<RegisterResponseDTO, string>> {
        return await this.post<RegisterResponseDTO>('/auth/register', registrationData);
    }

    /**
     * Verifies the given verification request by sending a PATCH request to the specified endpoint.
     *
     * @param {VerificationRequestDTO} dto - The data transfer object containing the verification details.
     * @return {Promise<Result<void, string>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    async Verify(dto: VerificationRequest): Promise<Result<void, string>> {
        return await this.patch<void>('/auth/confirm', dto);
    }

    /**
     * Authenticates a user by sending login credentials to the server.
     *
     * @param {LoginRequestDTO} dto - The data transfer object containing user login credentials.
     * @return {Promise<Result<LoginResultDTO, string>>} A promise that resolves to a result object containing either the authenticated user's data or an error message.
     */
    async Login(dto: LoginRequest): Promise<Result<LoginResultDTO, string>> {
        return await this.post<LoginResultDTO>('/auth/authenticate', dto);
    }

    /**
     * Resends the verification code to the specified email address.
     *
     * @param {string} email - The email address to resend the verification code to.
     * @return {Promise<Result<void, string>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    async ResendVerificationCode(email: string): Promise<Result<void, string>> {
        const encodedEmail: string = encodeURIComponent(email);
        return await this.get<void>(`/auth/resend-confirmation-code?email=${encodedEmail}`);
    }

    /**
     * Starts the forgot-password flow by requesting a recovery email.
     *
     * @param {ForgotPasswordRequestDTO} dto - The DTO containing the user's email.
     * @return {Promise<Result<void, string>>} A promise that resolves with success or an error code.
     */
    async ForgotPassword(email: string): Promise<Result<void, string>> {
        return await this.post<void>('/auth/forgot-password', { email });
    }

    /**
     * Completes the forgot-password flow by confirming token and new password.
     *
     * @param {ResetPasswordRequestDTO} dto - Token and new password payload.
     * @return {Promise<Result<void, string>>} A promise that resolves with success or an error code.
     */
    async ConfirmForgotPassword(dto: ResetPasswordRequest): Promise<Result<void, string>> {
        return await this.post<void>('/auth/forgot-password/confirm', dto);
    }
}
