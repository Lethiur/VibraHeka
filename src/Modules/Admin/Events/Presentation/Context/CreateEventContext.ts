import { createContext } from "react";
import { createEventUseCase } from "@admin/events/Domain/Composition/EventsComposition";
import { ICreateEventUseCase } from "@admin/events/Application/UseCases/CreateEvent/ICreateEventUseCase";

const CreateEventContext = createContext<ICreateEventUseCase>(createEventUseCase);

export default CreateEventContext;
