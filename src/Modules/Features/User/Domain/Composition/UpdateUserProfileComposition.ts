import IUpdateProfileUseCase from "@users/Application/UseCases/UpdateProfile/IUpdateProfileUseCase";
import UpdateProfileUseCaseImpl from "@users/Application/UseCases/UpdateProfile/UpdateProfileUseCaseImpl";
import UserProfileRepositoryImpl from "@users/Data/Repositories/UserProfileRepositoryImpl";
import GetProfileDatasource from "@users/Data/Datasources/ProfileDatasource";

export const UpdateProfileUseCase: IUpdateProfileUseCase = new UpdateProfileUseCaseImpl(new UserProfileRepositoryImpl(new GetProfileDatasource()));