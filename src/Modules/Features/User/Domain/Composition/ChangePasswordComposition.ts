import ChangePasswordUseCaseImpl from "@users/Application/UseCases/ChangePassword/ChangePasswordUseCaseImpl";
import IChangePasswordUseCase from "@users/Application/UseCases/ChangePassword/IChangePasswordUseCase";
import UserProfileRepositoryImpl from "@users/Data/Repositories/UserProfileRepositoryImpl";
import ProfileDatasource from "@users/Data/Datasources/ProfileDatasource";
import ChangePasswordDataValidator from "@users/Application/Validators/ChangePasswordDataValidator";

export const ChangePasswordUseCase: IChangePasswordUseCase = new ChangePasswordUseCaseImpl(
    new UserProfileRepositoryImpl(new ProfileDatasource()),
    new ChangePasswordDataValidator()
);

