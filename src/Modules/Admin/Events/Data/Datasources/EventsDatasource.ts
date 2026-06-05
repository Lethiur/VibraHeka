import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import { EventDto } from "@admin/events/Data/Entities/EventDto";
import { CreateEventRequest } from "@admin/events/Data/Entities/CreateEventRequest";
import { SellableItemType } from "@admin/catalog/Domain/Entities/CatalogEntities";

type ModifyProductVisibilityRequest = {
    productID: string;
    productType: SellableItemType;
};

export default class EventsDatasource extends BackendDatasource {
    public async GetEvents(fromDate: string, toDate: string): Promise<Result<EventDto[], string>> {
        return this.get<EventDto[]>(`events/${fromDate}/to/${toDate}`, true);
    }

    public async CreateEvent(data: CreateEventRequest): Promise<Result<string, string>> {
        return this.put<string>("events", data, true);
    }

    public async DeleteEvent(id: string): Promise<Result<void, string>> {
        return this.delete<void>(`events/${id}`, true);
    }

    public async DeactivateEvent(request: ModifyProductVisibilityRequest): Promise<Result<void, string>> {
        return this.patch<void>("events/deactivate", request, true);
    }

    public async ActivateEvent(request: ModifyProductVisibilityRequest): Promise<Result<void, string>> {
        return this.patch<void>("events/activate", request, true);
    }
}
