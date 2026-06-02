import { EventEntity } from "@admin/events/Domain/Entities/EventEntity";
import { EventDto } from "@admin/events/Data/Entities/EventDto";

export function mapEventDTO(dto: EventDto): EventEntity {
  return {
    EventID: dto.eventID,
    EventName: dto.name,
    EventDescription: dto.description,
    EventDateUtc: dto.eventDateUtc,
    Duration: dto.duration,
    EventTimezone: dto.eventTimezone,
    IsActive: dto.isActive,
  };
}
