import { createContext } from "react";
import { deleteEventUseCase } from "@admin/events/Domain/Composition/EventsComposition";
import { IDeleteEventUseCase } from "@admin/events/Application/UseCases/DeleteEvent/IDeleteEventUseCase";

const DeleteEventContext = createContext<IDeleteEventUseCase>(deleteEventUseCase);

export default DeleteEventContext;
