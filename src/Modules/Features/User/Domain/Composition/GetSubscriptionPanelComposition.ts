import SubscriptionDatasource from "@users/Data/Datasources/SubscriptionDatasource";
import SubscriptionRepositoryImpl from "@users/Data/Repositories/SubscriptionRepositoryImpl";
import GetSubscriptionPanelUseCaseImpl from "@users/Application/UseCases/GetSubscriptionPanel/GetSubscriptionPanelUseCaseImpl";
import IGetSubscriptionPanelUseCase from "@users/Application/UseCases/GetSubscriptionPanel/IGetSubscriptionPanelUseCase";

export const getSubscriptionPanelUseCase: IGetSubscriptionPanelUseCase = new GetSubscriptionPanelUseCaseImpl(new SubscriptionRepositoryImpl(new SubscriptionDatasource()));