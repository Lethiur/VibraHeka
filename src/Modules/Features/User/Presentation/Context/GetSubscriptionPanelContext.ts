import { createContext } from "react";
import IGetSubscriptionPanelUseCase from "@users/Application/UseCases/GetSubscriptionPanel/IGetSubscriptionPanelUseCase";
import { getSubscriptionPanelUseCase } from "@users/Domain/Composition/GetSubscriptionPanelComposition";

export const GetSubscriptionPanelContext = createContext<IGetSubscriptionPanelUseCase>(getSubscriptionPanelUseCase);
