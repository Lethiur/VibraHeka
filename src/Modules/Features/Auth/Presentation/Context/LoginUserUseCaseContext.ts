import {Context, createContext} from "react";
import LoginUserUseCase from "../../Application/UseCases/LoginUser/LoginUserUseCase.ts";
import {loginUserUseCase} from "@core/Domain/Composition/AuthComposition.ts";

export const LoginUserUseCaseContext: Context<LoginUserUseCase> = createContext(loginUserUseCase); 