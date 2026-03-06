import AuthDatasource from "@auth/Data/Datasources/AuthDatasource";
import { AuthRepositoryImpl } from "@auth/Data/Repositories/AuthRepositoryImpl";
import VerifyUserUseCaseImpl from "@auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl";
import LoginUserDataValidator from "@auth/Application/Validators/LoginUserDataValidator";
import LoginUserUseCase from "@auth/Application/UseCases/LoginUser/LoginUserUseCase";
import VerificationDataValidator
    from "@auth/Application/Validators/VerificationDataValidator";
import RegistrationDataValidator
    from "@auth/Application/Validators/RegistrationDataValidator";
import RegisterUserUseCase
    from "@auth/Application/UseCases/RegisterUser/RegisterUserUseCase";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import ResendVerificationCodeUseCase from "@auth/Application/UseCases/ResendVerificationCode/ResendVerificationCodeUseCaseImpl";
import { IResendVerificationCodeUseCase } from "@/Modules/Features/Auth/Application/UseCases/ResendVerificationCode/IResendVerificationCodeUseCase";
import ForgotPasswordUseCaseImpl
    from "@auth/Application/UseCases/ForgotPassword/ForgotPasswordUseCaseImpl";
import ForgotPasswordDataValidator from "@auth/Application/Validators/ForgotPasswordDataValidator";
import { IForgotPasswordUseCase } from "@auth/Application/UseCases/ForgotPassword/IForgotPasswordUseCase";
import ResetPasswordUseCaseImpl from "@auth/Application/UseCases/ResetPassword/ResetPasswordUseCaseImpl";
import { IResetPasswordUseCase } from "@auth/Application/UseCases/ResetPassword/IResetPasswordUseCase";
import ResetPasswordDataValidator from "@auth/Application/Validators/ResetPasswordDataValidator";

const datasource = new AuthDatasource();
const repository = new AuthRepositoryImpl(datasource);

export const registerUserUseCase = new RegisterUserUseCase(repository, new RegistrationDataValidator());

export const verifyUserUseCase = new VerifyUserUseCaseImpl(repository, new VerificationDataValidator());

export const loginUserUseCase = new LoginUserUseCase(repository, new LoginUserDataValidator(), new LocalStorageService());

export const resendVerificationCodeUseCase: IResendVerificationCodeUseCase = new ResendVerificationCodeUseCase(repository);

export const forgotPasswordUseCase: IForgotPasswordUseCase = new ForgotPasswordUseCaseImpl(
    repository,
    new ForgotPasswordDataValidator()
);

export const resetPasswordUseCase: IResetPasswordUseCase = new ResetPasswordUseCaseImpl(
    repository,
    new ResetPasswordDataValidator()
);


