import {IAddTherapistUseCase} from "@admin/addTherapist/Application/UseCases/AddTherapist/IAddTherapistUseCase";
import { createContext } from "react";
import {AddTherapistUseCase} from "@admin/addTherapist/Domain/Composition/TherapistComposition";

export const CreateTherapistUseCaseContext = createContext<IAddTherapistUseCase>(AddTherapistUseCase);
