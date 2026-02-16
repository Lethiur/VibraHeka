import SubscriptionDatasource from "@users/Data/Datasources/SubscriptionDatasource";
import SubscriptionRepositoryImpl from "@users/Data/Repositories/SubscriptionRepositoryImpl";
import CancelSubscriptionUseCaseImpl from "@users/Application/UseCases/CancelSubscription/CancelSubscriptionUseCaseImpl";
import ICancelSubscriptionUseCase from "@users/Application/UseCases/CancelSubscription/ICancelSubscriptionUseCase";

export const cancelSubscriptionUseCase: ICancelSubscriptionUseCase = new CancelSubscriptionUseCaseImpl(new SubscriptionRepositoryImpl(new SubscriptionDatasource()));
