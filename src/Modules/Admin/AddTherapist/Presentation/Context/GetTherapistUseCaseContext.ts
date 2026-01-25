import {GetTherapistUseCase} from "@admin/addTherapist/Domain/Composition/TherapistComposition";
import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase";
import {Context, createContext} from "react";


export const GetTherapistUseCaseContext : Context<IGetTherapistsUseCase> = createContext<IGetTherapistsUseCase>(GetTherapistUseCase);