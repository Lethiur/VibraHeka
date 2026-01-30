import { Context, createContext } from "react";
import RegisterUserUseCase from "../../Application/UseCases/RegisterUser/RegisterUserUseCase";
import { registerUserUseCase } from "../../../../../core/Domain/Composition/AuthComposition";

export const RegisterUseCaseContext: Context<RegisterUserUseCase> = createContext(registerUserUseCase);