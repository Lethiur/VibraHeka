import SubscriptionDatasource from "@users/Data/Datasources/SubscriptionDatasource";
import SubscriptionRepositoryImpl from "@users/Data/Repositories/SubscriptionRepositoryImpl";
import GetSubscriptionUseCaseImpl from "@users/Application/UseCases/GetSubscription/GetSubscriptionUseCaseImpl";
import IGetSubscriptionUseCase from "@users/Application/UseCases/GetSubscription/IGetSubscriptionUseCase";

export const getSubscriptionUseCase: IGetSubscriptionUseCase = new GetSubscriptionUseCaseImpl(new SubscriptionRepositoryImpl(new SubscriptionDatasource()));
