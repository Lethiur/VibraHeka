import { Result } from "neverthrow";
import { IGetEventsUseCase } from "@admin/events/Application/UseCases/GetEvents/IGetEventsUseCase";
import { EventEntity } from "@admin/events/Domain/Entities/EventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import { IEventsRepository } from "@admin/events/Domain/Repositories/IEventsRepository";

export default class GetEventsUseCaseImpl implements IGetEventsUseCase {
    constructor(private readonly Repository: IEventsRepository) { }

    public async Execute(fromDate: string, toDate: string): Promise<Result<EventEntity[], EventsErrors>> {
        return this.Repository.GetEvents(fromDate, toDate);
    }
}
