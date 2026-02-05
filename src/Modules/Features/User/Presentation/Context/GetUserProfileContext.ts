import { createContext } from "react";
import IGetProfileUseCase from "@users/Application/UseCases/GetProfile/IGetProfileUseCase";
import { getProfileUseCase } from "@users/Domain/Composition/GetUserProfileComposition";

export const GetUserProfileContext = createContext<IGetProfileUseCase>(getProfileUseCase);