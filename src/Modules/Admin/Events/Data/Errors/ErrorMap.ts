import { EventsApiErrors } from "@admin/events/Data/Errors/EventsApiErrors";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export const API_ERROR_MAP: Partial<Record<EventsApiErrors, EventsErrors>> = {
    [EventsApiErrors.UNAUTHORIZED]: EventsErrors.UNAUTHORIZED,
    [EventsApiErrors.NETWORK_ERROR]: EventsErrors.NETWORK_ERROR,
    [EventsApiErrors.INVALID_FORM]: EventsErrors.CREATE_FAILED,
    [EventsApiErrors.UNKNOWN_ERROR]: EventsErrors.GENERAL_ERROR,
};
