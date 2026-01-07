import {Context, createContext} from "react";
import RegisterUserUseCase from "../../Application/UseCases/RegisterUser/RegisterUserUseCase.ts";
import {registerUserUseCase} from "../../../../../Core/Domain/Composition/AuthComposition.ts";

export const RegisterUseCaseContext : Context<RegisterUserUseCase> = createContext(registerUserUseCase);