import ChangePasswordUseCaseImpl from "@users/Application/UseCases/ChangePassword/ChangePasswordUseCaseImpl";
import IChangePasswordUseCase from "@users/Application/UseCases/ChangePassword/IChangePasswordUseCase";
import UserProfileRepositoryImpl from "@users/Data/Repositories/UserProfileRepositoryImpl";
import ProfileDatasource from "@users/Data/Datasources/ProfileDatasource";
import ChangePasswordDataValidator from "@users/Application/Validators/ChangePasswordDataValidator";
import AuthDatasource from "@/Modules/Features/Auth/Data/Datasources/AuthDatasource";

export const ChangePasswordUseCase: IChangePasswordUseCase = new ChangePasswordUseCaseImpl(
    new UserProfileRepositoryImpl(new ProfileDatasource(), new AuthDatasource()),
    new ChangePasswordDataValidator()
);

