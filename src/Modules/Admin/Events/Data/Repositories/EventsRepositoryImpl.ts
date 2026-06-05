import { Result, ResultAsync } from "neverthrow";
import { API_ERROR_MAP } from "@admin/events/Data/Errors/ErrorMap";
import { EventsApiErrors } from "@admin/events/Data/Errors/EventsApiErrors";
import EventsDatasource from "@admin/events/Data/Datasources/EventsDatasource";
import { EventDto } from "@admin/events/Data/Entities/EventDto";
import { CreateEventEntity } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventEntity } from "@admin/events/Domain/Entities/EventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import { IEventsRepository } from "@admin/events/Domain/Repositories/IEventsRepository";
import { mapEventDTO } from "@admin/events/Data/Mappers/EventMapper";
import { SellableItemType } from "@admin/catalog/Domain/Entities/CatalogEntities";

export default class EventsRepositoryImpl implements IEventsRepository {
    constructor(private readonly Datasource: EventsDatasource = new EventsDatasource()) { }

    public async GetEvents(fromDate: string, toDate: string): Promise<Result<EventEntity[], EventsErrors>> {
        const result = await this.Datasource.GetEvents(fromDate, toDate);
        return result
            .map((dtos: EventDto[]): EventEntity[] => dtos.map(mapEventDTO))
            .mapErr((error) => API_ERROR_MAP[error as EventsApiErrors] ?? EventsErrors.LIST_FAILED);
    }

    public async CreateEvent(data: CreateEventEntity): Promise<Result<string, EventsErrors>> {
        const result = await this.Datasource.CreateEvent({
            eventName: data.EventName,
            eventDescription: data.EventDescription,
            eventDate: data.EventDate,
            duration: data.Duration,
            eventTimezone: data.EventTimezone,
            price: data.Price,
            currencyCode: data.CurrencyCode,
        });
        return result.mapErr((error) => API_ERROR_MAP[error as EventsApiErrors] ?? EventsErrors.CREATE_FAILED);
    }

    public async DeleteEvent(id: string): Promise<Result<void, EventsErrors>> {
        return ResultAsync.fromPromise(this.Datasource.DeleteEvent(id), () => EventsErrors.DELETE_FAILED)
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as EventsApiErrors] ?? EventsErrors.DELETE_FAILED);
    }

    public async DeactivateEvent(id: string): Promise<Result<void, EventsErrors>> {
        return ResultAsync.fromPromise(
            this.Datasource.DeactivateEvent({ productID: id, productType: SellableItemType.Event }),
            () => EventsErrors.TOGGLE_STATUS_FAILED,
        )
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as EventsApiErrors] ?? EventsErrors.TOGGLE_STATUS_FAILED);
    }

    public async ActivateEvent(id: string): Promise<Result<void, EventsErrors>> {
        return ResultAsync.fromPromise(
            this.Datasource.ActivateEvent({ productID: id, productType: SellableItemType.Event }),
            () => EventsErrors.TOGGLE_STATUS_FAILED,
        )
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as EventsApiErrors] ?? EventsErrors.TOGGLE_STATUS_FAILED);
    }
}
