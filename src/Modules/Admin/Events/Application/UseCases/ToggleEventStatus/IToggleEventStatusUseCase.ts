import { Result } from "neverthrow";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export interface IToggleEventStatusUseCase {
    Execute(id: string, activate: boolean): Promise<Result<void, EventsErrors>>;
}
