import { IAuthRepository } from "@auth/Domain/Repositories/IAuthRepository";
import { Result } from 'neverthrow';
import { RegistrationData } from "@auth/Domain/Models/RegistrationData";
import { RegistrationResult } from "@auth/Domain/Models/RegistrationResult";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { VerificationData } from "@auth/Domain/Models/VerificationData";
import { LoginData } from "@auth/Domain/Models/LoginData";
import { LoginResult } from "@auth/Domain/Models/LoginResult";
import { createSuccessResult, createFailureResult } from "../../../../../Utils/TestUtils";

export default class MockAuthRepository implements IAuthRepository {

    public Register = jest.fn<Promise<Result<RegistrationResult, AuthErrorCodes>>, [RegistrationData]>();
    public Verify = jest.fn<Promise<Result<void, AuthErrorCodes>>, [VerificationData]>();
    public Login = jest.fn<Promise<Result<LoginResult, AuthErrorCodes>>, [LoginData]>();
    public ResendVerificationCode = jest.fn<Promise<Result<void, AuthErrorCodes>>, []>();

    public mockLoginSuccess(result: LoginResult) {
        this.Login.mockResolvedValue(createSuccessResult(result));
    }

    public mockLoginFailure(error: AuthErrorCodes) {
        this.Login.mockResolvedValue(createFailureResult(error));
    }

    public mockVerificationCodeSuccess() {
        this.ResendVerificationCode.mockResolvedValue(createSuccessResult(void 0));
    }
}
