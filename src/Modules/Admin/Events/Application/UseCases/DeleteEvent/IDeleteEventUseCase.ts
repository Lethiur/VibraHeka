import { Result } from "neverthrow";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export interface IDeleteEventUseCase {
    Execute(id: string): Promise<Result<void, EventsErrors>>;
}
