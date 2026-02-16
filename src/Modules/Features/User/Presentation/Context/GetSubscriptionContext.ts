import { createContext } from "react";
import IGetSubscriptionUseCase from "@users/Application/UseCases/GetSubscription/IGetSubscriptionUseCase";
import { getSubscriptionUseCase } from "@users/Domain/Composition/GetSubscriptionComposition";

export const GetSubscriptionContext = createContext<IGetSubscriptionUseCase>(getSubscriptionUseCase);
