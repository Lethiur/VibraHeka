import AuthDatasource from "../../../Modules/Features/Auth/Data/Datasources/AuthDatasource.ts";
import { AuthRepositoryImpl } from "../../../Modules/Features/Auth/Data/Repositories/AuthRepositoryImpl.ts";
import VerifyUserUseCaseImpl from "../../../Modules/Features/Auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl.ts";
import LoginUserDataValidator from "../../../Modules/Features/Auth/Application/Validators/LoginUserDataValidator.ts";
import LoginUserUseCase from "../../../Modules/Features/Auth/Application/UseCases/LoginUser/LoginUserUseCase.ts";
import VerificationDataValidator
    from "../../../Modules/Features/Auth/Application/Validators/VerificationDataValidator.ts";
import RegistrationDataValidator
    from "../../../Modules/Features/Auth/Application/Validators/RegistrationDataValidator.ts";
import RegisterUserUseCase
    from "../../../Modules/Features/Auth/Application/UseCases/RegisterUser/RegisterUserUseCase.ts";
import LocalStorageService from "../../Infrastructure/Storage/LocalStorageService.ts";

const datasource = new AuthDatasource();
const repository = new AuthRepositoryImpl(datasource);

export const registerUserUseCase = new RegisterUserUseCase(repository, new RegistrationDataValidator());

export const verifyUserUseCase = new VerifyUserUseCaseImpl(repository, new VerificationDataValidator());

export const loginUserUseCase = new LoginUserUseCase(repository, new LoginUserDataValidator(), new LocalStorageService());