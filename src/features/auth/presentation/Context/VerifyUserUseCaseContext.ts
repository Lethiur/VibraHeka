import {Context, createContext} from "react";
import VerifyUserUseCaseImpl from "../../Application/UseCases/VerifyUser/VerifyUserUseCaseImpl.ts";
import {verifyUserUseCase} from "../../../../Composition/AuthComposition.ts";

export const VerifyUserUseCaseContext : Context<VerifyUserUseCaseImpl> = createContext(verifyUserUseCase);