import {RecordingEntity} from "@recordings/Domain/Entities/RecordingEntity.ts";
import {RecordingDto, RecordingTier} from "@recordings/Data/Entities/RecordingDto.ts";

export default class RecordingEntityMapper {
    
    public ToDomain(dto: RecordingDto): RecordingEntity {

        return {
            Name : dto.name,
            Type: dto.type,
            Id: dto.id,
            Description: dto.description,
        };
    }
    
    public ToDto(entity: RecordingEntity): RecordingDto {
        return {
            name: entity.Name,
            type: entity.Type,
            tier: RecordingTier.FREE,
            id: entity.Id,
            description: entity.Description,
        };
    }
    
}