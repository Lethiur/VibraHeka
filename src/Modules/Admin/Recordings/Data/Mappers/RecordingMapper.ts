import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import AddRecordingResponse from "@admin/recordings/Domain/Entities/AddRecordingResponse";
import AddRecordingResult from "@admin/recordings/Data/Entities/AddRecordingResult";
import { RecordingDto } from "@admin/recordings/Data/Entities/RecordingDto";

export function mapRecordingDTO(dto: RecordingDto): RecordingEntity {
  return {
    Id: dto.id,
    Name: dto.name,
    Description: dto.description,
    Tier: dto.tier,
    Type: dto.type,
    Created: dto.created,
  };
}

export function mapAddRecordingResult(dto: AddRecordingResult): AddRecordingResponse {
  return {
    RecordingId: dto.recordingId,
    UploadUrl: dto.uploadUrl,
  };
}
