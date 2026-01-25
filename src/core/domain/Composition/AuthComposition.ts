import AuthDatasource from "../../../Modules/Features/Auth/Data/Datasources/AuthDatasource";
import { AuthRepositoryImpl } from "@auth/Data/Repositories/AuthRepositoryImpl";
import VerifyUserUseCaseImpl from "@auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl";
import LoginUserDataValidator from "../../../Modules/Features/Auth/Application/Validators/LoginUserDataValidator";
import LoginUserUseCase from "../../../Modules/Features/Auth/Application/UseCases/LoginUser/LoginUserUseCase";
import VerificationDataValidator
    from "../../../Modules/Features/Auth/Application/Validators/VerificationDataValidator";
import RegistrationDataValidator
    from "../../../Modules/Features/Auth/Application/Validators/RegistrationDataValidator";
import RegisterUserUseCase
    from "../../../Modules/Features/Auth/Application/UseCases/RegisterUser/RegisterUserUseCase";
import LocalStorageService from "../../Infrastructure/Storage/LocalStorageService";

const datasource = new AuthDatasource();
const repository = new AuthRepositoryImpl(datasource);

export const registerUserUseCase = new RegisterUserUseCase(repository, new RegistrationDataValidator());

export const verifyUserUseCase = new VerifyUserUseCaseImpl(repository, new VerificationDataValidator());

export const loginUserUseCase = new LoginUserUseCase(repository, new LoginUserDataValidator(), new LocalStorageService());