import { Result } from "neverthrow";
import { RegistrationCommand } from "@auth/Domain/Commands/RegistrationCommand.ts";
import { VerificationCommand } from "@auth/Domain/Commands/VerificationCommand.ts";
import { LoginCommand } from "@auth/Domain/Commands/LoginCommand.ts";
import { ResetPasswordCommand } from "@auth/Domain/Commands/ResetPasswordCommand.ts";
import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import {
    AuthenticateUserRequest, AuthenticateUserResponse,
    AuthenticationApi, ChangePasswordRequest, ConfirmResetPasswordRequest,
    RegisterUserRequest,
    RegisterUserResponse, ResendConfirmationCodeRequest, ResetPasswordRequest,
    VerifyUserRequest
} from "@/Generated/api/authentication";
import {BASE_PATH} from "@/Generated/api/authentication/base.ts";
import {
    mapToChangePasswordRequest,
    mapToConfirmPasswordRequest,
    mapToLoginRequestRequest,
    mapToRegistrationRequestDTO,
    mapToVerificationRequest
} from "@auth/Data/Mappers/AuthMapper.ts";
import ChangePasswordCommand from "@auth/Domain/Commands/ChangePasswordCommand.ts";

/**
 * Represents an authentication data source responsible for handling
 * authentication-related API calls, inheriting from ApiDatasource.
 */
export default class AuthDatasource extends BackendDatasource {

    private readonly Api : AuthenticationApi;

    constructor() {
        super();
        this.Api = new AuthenticationApi(undefined, BASE_PATH, this.AxiosInstance);
    }

    /**
     * Registers a new user with the provided registration data.
     *
     * @param {RegistrationCommand} request - The data required for registering a user.
     * @return {Promise<Result<RegisterUserResponse, string>>} A promise that resolves to a result containing either the registration response on success or an error code on failure.
     */
    public async register(request: RegistrationCommand): Promise<Result<RegisterUserResponse, string>> {
        const dto: RegisterUserRequest = mapToRegistrationRequestDTO(request);
        return await this.PerformAndUnwrap(() => this.Api.registerUser(dto));
    }

    /**
     * Verifies the given verification request by sending a PATCH request to the specified endpoint.
     *
     * @param {VerificationCommand} request - The data transfer object containing the verification details.
     * @return {Promise<Result<void, string>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    async Verify(request: VerificationCommand): Promise<Result<void, string>> {
        const req: VerifyUserRequest = mapToVerificationRequest(request);
        return await this.PerformAndUnwrap(() => this.Api.verifyUser(req));
    }

    /**
     * Authenticates a user by sending login credentials to the server.
     *
     * @param {LoginCommand} request - The data transfer object containing user login credentials.
     * @return {Promise<Result<LoginResultDTO, string>>} A promise that resolves to a result object containing either the authenticated user's data or an error message.
     */
    async Login(request: LoginCommand): Promise<Result<AuthenticateUserResponse, string>> {
        const req: AuthenticateUserRequest = mapToLoginRequestRequest(request);
        return await this.PerformAndUnwrap(() => this.Api.authenticateUser(req));
    }

    /**
     * Resends the verification code to the specified email address.
     *
     * @param {string} email - The email address to resend the verification code to.
     * @return {Promise<Result<void, string>>} A promise that resolves with a `Result` containing either a success or error message.
     */
    async ResendVerificationCode(email: string): Promise<Result<void, string>> {
        const request : ResendConfirmationCodeRequest = {
            email
        }
        return await this.PerformAndUnwrap(() => this.Api.resendConfirmationCode(request));
    }

    /**
     * Initiates a password reset process for the provided email address.
     *
     * @param {string} email - The email address of the user requesting the password reset.
     * @return {Promise<Result<void, string>>} A promise resolving to a result object which indicates success or contains an error message.
     */
    async ForgotPassword(email: string): Promise<Result<void, string>> {
        const request : ResetPasswordRequest = {
            email
        }
        return await this.PerformAndUnwrap(() => this.Api.resetPassword(request));
    }

    /**
     * Confirms a forgotten password reset request.
     *
     * @param {ResetPasswordCommand} request - The user-provided reset password request data to confirm.
     * @return {Promise<Result<void, string>>} A promise that resolves to a Result object containing either a success signal (void) or an error message (string).
     */
    async ConfirmForgotPassword(request: ResetPasswordCommand): Promise<Result<void, string>> {
        const req : ConfirmResetPasswordRequest  = mapToConfirmPasswordRequest(request);
        return await this.PerformAndUnwrap(() => this.Api.confirmResetPassword(req));
    }

    /**
     * Updates the user's password based on the provided request.
     *
     * @param {ChangePasswordCommand} request - The request object containing the necessary data to update the password.
     * @return {Promise<Result<void, string>>} A promise that resolves with a result object. The result will either represent success (void) or a failure with an error message.
     */
    public async ChangePassword(request: ChangePasswordCommand): Promise<Result<void, string>> {
        const req: ChangePasswordRequest = mapToChangePasswordRequest(request);
        return await this.PerformAndUnwrap(() => this.Api.changePassword(req));
    }

}
