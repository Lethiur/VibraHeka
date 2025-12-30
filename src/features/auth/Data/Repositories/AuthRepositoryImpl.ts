import {RegistrationRequestDto} from "../DTOs/RegistrationRequestDTO.ts";
import {RegisterResponseDto} from "../DTOs/RegistrationResponseDTO.ts";
import AuthDatasource from "../Datasources/AuthDatasource.ts";
import {AuthErrorCodes} from "../../Domain/Errors/AuthErrorCodes.ts";
import {RegistrationResult} from "../../Domain/Models/RegistrationResult.ts";
import {Result} from "neverthrow";
import {IAuthRepository} from "../../Domain/Repositories/IAuthRepository.ts";
import {RegistrationData} from "../../Domain/Models/RegistrationData.ts";
import {VerificationData} from "../../Domain/Models/VerificationData.ts";
import {VerificationRequestDTO} from "../DTOs/VerificationRequestDTO.ts";
import {LoginData} from "../../Domain/Models/LoginData.ts";
import {LoginResult} from "../../Domain/Models/LoginResult.ts";
import {LoginResultDTO} from "../DTOs/LoginResultDTO.ts";
import {LoginRequestDTO} from "../DTOs/LoginRequestDTO.ts";

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
        const dto: LoginRequestDTO = {
            email: data.email,
            password: data.password,
        }

        const result: Result<LoginResultDTO, string> = await this.datasource.Login(dto);
        
        return result.map<LoginResult>((loginResult : LoginResultDTO) => {
            return {
                UserID: loginResult.userID,
                Token: loginResult.accessToken,
                RefreshToken: loginResult.refreshToken,
            }
        }).mapErr(error => error as AuthErrorCodes);
    }

    /**
     * Verifies the provided data to determine its authenticity or validity.
     *
     * @param {VerificationData} data - The data to be verified.
     * @return {Promise<Result<void, AuthErrorCodes>>} A promise that resolves with a result indicating success or failure, or an error code if verification fails.
     */
    public async Verify(data: VerificationData): Promise<Result<void, AuthErrorCodes>> {
        const dto: VerificationRequestDTO = {
            email: data.email,
            code: data.code
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
        const dto: RegistrationRequestDto = {
            email: data.email,
            password: data.password,
            fullName: data.fullName,
        };

        const result: Result<RegisterResponseDto, string> = await this.datasource.register(dto);

        return result.map((value) => ({
            userId: value.userId,
            needsConfirmation: value.needsConfirmation,
        })).mapErr((error) => error as AuthErrorCodes);
    }
}
