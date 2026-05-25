import { Result, err } from "neverthrow";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { ICreateEventUseCase } from "@admin/events/Application/UseCases/CreateEvent/ICreateEventUseCase";
import CreateEventValidator from "@admin/events/Application/Validators/CreateEventValidator";
import { CreateEventEntity } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import { IEventsRepository } from "@admin/events/Domain/Repositories/IEventsRepository";

export default class CreateEventUseCaseImpl implements ICreateEventUseCase {
    constructor(
        private readonly Repository: IEventsRepository,
        private readonly Validator: CreateEventValidator,
    ) { }

    public async Execute(data: CreateEventEntity): Promise<Result<string, EventsErrors>> {
        const validationResult = this.Validator.validate(data);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        const result = await this.Repository.CreateEvent(data);
        if (result.isErr()) {
            return err(result.error);
        }

        return result;
    }
}
