import { Result } from "neverthrow";
import { IDeleteEventUseCase } from "@admin/events/Application/UseCases/DeleteEvent/IDeleteEventUseCase";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import { IEventsRepository } from "@admin/events/Domain/Repositories/IEventsRepository";

export default class DeleteEventUseCaseImpl implements IDeleteEventUseCase {
    constructor(private readonly Repository: IEventsRepository) { }

    public async Execute(id: string): Promise<Result<void, EventsErrors>> {
        return this.Repository.DeleteEvent(id);
    }
}
