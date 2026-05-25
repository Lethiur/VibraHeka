import { Result } from "neverthrow";
import { CreateEventEntity } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export interface ICreateEventUseCase {
    Execute(data: CreateEventEntity): Promise<Result<string, EventsErrors>>;
}
