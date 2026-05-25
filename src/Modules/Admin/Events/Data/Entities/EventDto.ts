export interface EventDto {
    eventId: string;
    name: string;
    description: string;
    eventDateUtc: string;
    duration: number;
    eventTimezone: string;
    isActive: boolean;
}
