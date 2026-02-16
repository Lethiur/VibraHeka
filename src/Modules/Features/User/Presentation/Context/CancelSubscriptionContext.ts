import { createContext } from "react";
import ICancelSubscriptionUseCase from "@users/Application/UseCases/CancelSubscription/ICancelSubscriptionUseCase";
import { cancelSubscriptionUseCase } from "@users/Domain/Composition/CancelSubscriptionComposition";

/**
 * CancelSubscriptionContext
 * @description Cancel subscription context
 */
export const CancelSubscriptionContext = createContext<ICancelSubscriptionUseCase>(cancelSubscriptionUseCase);
