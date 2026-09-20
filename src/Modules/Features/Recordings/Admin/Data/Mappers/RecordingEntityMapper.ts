import {RecordingEntity, RecordingTier} from "@/Modules/Features/Recordings/User/Domain/Entities/RecordingEntity";
import {RecordingDto} from "@/Modules/Features/Recordings/User/Data/Entities/RecordingDto";

export default class RecordingEntityMapper {
    
    public ToDomain(dto: RecordingDto): RecordingEntity {

        return {
            Name : dto.name,
            Type: dto.type,
            Id: dto.id,
            Description: dto.description,
            Tier: dto.tier,
        };
    }
    
    public ToDto(entity: RecordingEntity): RecordingDto {
        return {
            name: entity.Name,
            type: entity.Type,
            tier: entity.Tier ?? RecordingTier.FREE,
            id: entity.Id,
            description: entity.Description,
        };
    }
    
}