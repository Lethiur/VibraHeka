import { createContext } from "react";
import { getEventsUseCase } from "@admin/events/Domain/Composition/EventsComposition";
import { IGetEventsUseCase } from "@admin/events/Application/UseCases/GetEvents/IGetEventsUseCase";

const GetEventsContext = createContext<IGetEventsUseCase>(getEventsUseCase);

export default GetEventsContext;
