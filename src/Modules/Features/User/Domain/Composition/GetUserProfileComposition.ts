import GetProfileDatasource from "@/Modules/Features/User/Data/Datasources/ProfileDatasource";
import UserProfileRepositoryImpl from "@users/Data/Repositories/UserProfileRepositoryImpl";
import GetProfileUseCaseImpl from "@users/Application/UseCases/GetProfile/GetProfileUseCaseImpl";
import IGetProfileUseCase from "@users/Application/UseCases/GetProfile/IGetProfileUseCase";


export const getProfileUseCase: IGetProfileUseCase = new GetProfileUseCaseImpl(new UserProfileRepositoryImpl(new GetProfileDatasource()));