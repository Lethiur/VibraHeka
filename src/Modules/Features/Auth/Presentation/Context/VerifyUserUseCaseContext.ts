import { Context, createContext } from "react";
import VerifyUserUseCaseImpl from "../../Application/UseCases/VerifyUser/VerifyUserUseCaseImpl";
import { verifyUserUseCase } from "../../../../../core/Domain/Composition/AuthComposition";

export const VerifyUserUseCaseContext: Context<VerifyUserUseCaseImpl> = createContext(verifyUserUseCase);