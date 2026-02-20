import SubscriptionDatasource from "@users/Data/Datasources/SubscriptionDatasource";
import SubscriptionRepositoryImpl from "@users/Data/Repositories/SubscriptionRepositoryImpl";
import ReactivateSubscriptionUseCaseImpl from "@users/Application/UseCases/ReactivateSubscription/ReactivateSubscriptionUseCaseImpl";
import IReactivateSubscriptionUseCase from "@users/Application/UseCases/ReactivateSubscription/IReactivateSubscriptionUseCase";

export const reactivateSubscriptionUseCase: IReactivateSubscriptionUseCase = new ReactivateSubscriptionUseCaseImpl(new SubscriptionRepositoryImpl(new SubscriptionDatasource()));
