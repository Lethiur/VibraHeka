import {IAddTherapistUseCase} from "@admin/addTherapist/Application/UseCases/AddTherapist/IAddTherapistUseCase.ts";
import { createContext } from "react";
import {AddTherapistUseCase} from "@admin/addTherapist/Domain/Composition/TherapistComposition.ts";

export const CreateTherapistUseCaseContext = createContext<IAddTherapistUseCase>(AddTherapistUseCase);
