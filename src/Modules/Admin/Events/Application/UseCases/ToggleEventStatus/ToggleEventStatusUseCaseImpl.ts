import { Result } from "neverthrow";
import { IToggleEventStatusUseCase } from "@admin/events/Application/UseCases/ToggleEventStatus/IToggleEventStatusUseCase";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import { IEventsRepository } from "@admin/events/Domain/Repositories/IEventsRepository";

export default class ToggleEventStatusUseCaseImpl implements IToggleEventStatusUseCase {
    constructor(private readonly Repository: IEventsRepository) { }

    public async Execute(id: string, activate: boolean): Promise<Result<void, EventsErrors>> {
        if (activate) {
            return this.Repository.ActivateEvent(id);
        }
        return this.Repository.DeactivateEvent(id);
    }
}
