import { createContext } from "react";
import ISubscribeUseCase from "@users/Application/UseCases/Subscribe/ISubscribeUseCase";
import { subscribeUseCase } from "@users/Domain/Composition/SubscribeComposition";

export const SubscribeContext = createContext<ISubscribeUseCase>(subscribeUseCase);
