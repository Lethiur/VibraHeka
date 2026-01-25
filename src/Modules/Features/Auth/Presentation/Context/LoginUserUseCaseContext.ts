import {Context, createContext} from "react";
import LoginUserUseCase from "../../Application/UseCases/LoginUser/LoginUserUseCase";
import {loginUserUseCase} from "@core/Domain/Composition/AuthComposition";

export const LoginUserUseCaseContext: Context<LoginUserUseCase> = createContext(loginUserUseCase); 