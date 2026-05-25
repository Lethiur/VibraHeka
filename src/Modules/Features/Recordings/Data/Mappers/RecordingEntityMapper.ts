import {RecordingEntity, RecordingTier} from "@recordings/Domain/Entities/RecordingEntity.ts";
import {RecordingDto} from "@recordings/Data/Entities/RecordingDto.ts";

export default class RecordingEntityMapper {
    
    public ToDomain(dto: RecordingDto): RecordingEntity {

        return {
            Name : dto.name,
            Type: dto.recordingType,
            Id: dto.id,
            Description: dto.description,
            Tier: dto.tier,
        };
    }
    
    public ToDto(entity: RecordingEntity): RecordingDto {
        return {
            name: entity.Name,
            recordingType: entity.Type,
            tier: entity.Tier ?? RecordingTier.FREE,
            id: entity.Id,
            description: entity.Description,
        };
    }
    
}