import SubscriptionDatasource from "@users/Data/Datasources/SubscriptionDatasource";
import SubscriptionRepositoryImpl from "@users/Data/Repositories/SubscriptionRepositoryImpl";
import SubscribeUseCaseImpl from "@users/Application/UseCases/Subscribe/SubscribeUseCaseImpl";
import ISubscribeUseCase from "@users/Application/UseCases/Subscribe/ISubscribeUseCase";

export const subscribeUseCase: ISubscribeUseCase = new SubscribeUseCaseImpl(new SubscriptionRepositoryImpl(new SubscriptionDatasource()));
