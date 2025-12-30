import AuthDatasource from "../features/auth/Data/Datasources/AuthDatasource.ts";
import {AuthRepositoryImpl} from "../features/auth/Data/Repositories/AuthRepositoryImpl.ts";
import RegisterUserUseCase from "../features/auth/Application/UseCases/RegisterUser/RegisterUserUseCase.ts";
import RegistrationDataValidator from "../features/auth/Application/Validators/RegistrationDataValidator.ts";
import VerifyUserUseCaseImpl from "../features/auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl.ts";
import VerificationDataValidator from "../features/auth/Application/Validators/VerificationDataValidator.ts";
import LoginUserDataValidator from "../features/auth/Application/Validators/LoginUserDataValidator.ts";
import LoginUserUseCase from "../features/auth/Application/UseCases/LoginUser/LoginUserUseCase.ts";

const datasource = new AuthDatasource();
const repository = new AuthRepositoryImpl(datasource);

export const registerUserUseCase = new RegisterUserUseCase(repository, new RegistrationDataValidator());

export const verifyUserUseCase = new VerifyUserUseCaseImpl(repository, new VerificationDataValidator());

export const loginUserUseCase = new LoginUserUseCase(repository, new LoginUserDataValidator());