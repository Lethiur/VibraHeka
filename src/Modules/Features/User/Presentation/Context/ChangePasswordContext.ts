import { Context, createContext } from "react";
import IChangePasswordUseCase from "@users/Application/UseCases/ChangePassword/IChangePasswordUseCase";
import { ChangePasswordUseCase } from "@users/Domain/Composition/ChangePasswordComposition";

export const ChangePasswordContext: Context<IChangePasswordUseCase> = createContext(ChangePasswordUseCase);

