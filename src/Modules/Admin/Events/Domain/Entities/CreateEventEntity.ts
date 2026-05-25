export enum CurrencyIsoCode {
    USD = "USD",
    ARS = "ARS",
    EUR = "EUR",
}

export interface CreateEventEntity {
    EventName: string;
    EventDescription: string;
    EventDate: string;
    Duration: number;
    EventTimezone: string;
    Price: number;
    CurrencyCode: CurrencyIsoCode;
}
