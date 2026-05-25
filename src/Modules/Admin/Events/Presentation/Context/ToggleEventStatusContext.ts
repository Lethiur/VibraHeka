import { createContext } from "react";
import { toggleEventStatusUseCase } from "@admin/events/Domain/Composition/EventsComposition";
import { IToggleEventStatusUseCase } from "@admin/events/Application/UseCases/ToggleEventStatus/IToggleEventStatusUseCase";

const ToggleEventStatusContext = createContext<IToggleEventStatusUseCase>(toggleEventStatusUseCase);

export default ToggleEventStatusContext;
