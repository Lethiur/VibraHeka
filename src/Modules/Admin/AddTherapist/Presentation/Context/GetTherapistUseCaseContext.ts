import {GetTherapistUseCase} from "@admin/addTherapist/Domain/Composition/TherapistComposition.ts";
import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase.ts";
import {Context, createContext} from "react";


export const GetTherapistUseCaseContext : Context<IGetTherapistsUseCase> = createContext<IGetTherapistsUseCase>(GetTherapistUseCase);