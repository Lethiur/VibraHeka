import { createContext } from "react";
import IReactivateSubscriptionUseCase from "@users/Application/UseCases/ReactivateSubscription/IReactivateSubscriptionUseCase";
import { reactivateSubscriptionUseCase } from "@users/Domain/Composition/ReactivateSubscriptionComposition";

/**
 * ReactivateSubscriptionContext
 * @description Reactivate subscription context
 */
export const ReactivateSubscriptionContext = createContext<IReactivateSubscriptionUseCase>(reactivateSubscriptionUseCase);
