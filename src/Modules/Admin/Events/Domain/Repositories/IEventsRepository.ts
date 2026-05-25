import { Result } from "neverthrow";
import { CreateEventEntity } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventEntity } from "@admin/events/Domain/Entities/EventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export interface IEventsRepository {
    GetEvents(fromDate: string, toDate: string): Promise<Result<EventEntity[], EventsErrors>>;
    CreateEvent(data: CreateEventEntity): Promise<Result<string, EventsErrors>>;
    DeleteEvent(id: string): Promise<Result<void, EventsErrors>>;
    DeactivateEvent(id: string): Promise<Result<void, EventsErrors>>;
    ActivateEvent(id: string): Promise<Result<void, EventsErrors>>;
}
