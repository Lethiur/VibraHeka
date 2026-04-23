import {RecordingEntity} from "@recordings/Domain/Entities/RecordingEntity.ts";
import {RecordingDto} from "@recordings/Data/Entities/RecordingDto.ts";

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
            id: entity.Id,
            description: entity.Description,
        };
    }
    
}