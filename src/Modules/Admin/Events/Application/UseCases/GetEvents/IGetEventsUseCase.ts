import { Result } from "neverthrow";
import { EventEntity } from "@admin/events/Domain/Entities/EventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export interface IGetEventsUseCase {
    Execute(fromDate: string, toDate: string): Promise<Result<EventEntity[], EventsErrors>>;
}
