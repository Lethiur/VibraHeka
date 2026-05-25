export interface CreateEventRequest {
    eventName: string;
    eventDescription: string;
    eventDate: string;
    duration: number;
    eventTimezone: string;
    price: number;
    currencyCode: string;
}
