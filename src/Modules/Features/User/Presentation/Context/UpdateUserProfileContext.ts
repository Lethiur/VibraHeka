import { Context, createContext } from "react";
import IUpdateProfileUseCase from "@users/Application/UseCases/UpdateProfile/IUpdateProfileUseCase";
import { UpdateProfileUseCase } from "@users/Domain/Composition/UpdateUserProfileComposition";


export const UpdateUserProfileContext: Context<IUpdateProfileUseCase> = createContext(UpdateProfileUseCase)