import AuthDatasource from "../Features/Auth/Data/Datasources/AuthDatasource.ts";
import { AuthRepositoryImpl } from "../Features/Auth/Data/Repositories/AuthRepositoryImpl.ts";
import RegisterUserUseCase from "../Features/auth/Application/UseCases/RegisterUser/RegisterUserUseCase.ts";
import RegistrationDataValidator from "../Features/auth/Application/Validators/RegistrationDataValidator.ts";
import VerifyUserUseCaseImpl from "../Features/Auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl.ts";
import VerificationDataValidator from "../Features/auth/Application/Validators/VerificationDataValidator.ts";
import LoginUserDataValidator from "../Features/Auth/Application/Validators/LoginUserDataValidator.ts";
import LoginUserUseCase from "../Features/Auth/Application/UseCases/LoginUser/LoginUserUseCase.ts";
import LocalStorageService from "../core/Infrastructure/Storage/LocalStorageService.ts";

const datasource = new AuthDatasource();
const repository = new AuthRepositoryImpl(datasource);

export const registerUserUseCase = new RegisterUserUseCase(repository, new RegistrationDataValidator());

export const verifyUserUseCase = new VerifyUserUseCaseImpl(repository, new VerificationDataValidator());

export const loginUserUseCase = new LoginUserUseCase(repository, new LoginUserDataValidator(), new LocalStorageService());