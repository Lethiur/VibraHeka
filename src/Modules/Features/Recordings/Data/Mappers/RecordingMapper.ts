import { RecordingEntity } from "@/Modules/Features/Recordings/Admin/Domain/Entities/RecordingEntity";
import AddRecordingResponse from "@/Modules/Features/Recordings/Admin/Domain/Entities/AddRecordingResponse";
import AddRecordingResult from "@/Modules/Features/Recordings/Admin/Data/Entities/AddRecordingResult";
import { RecordingDto } from "@/Modules/Features/Recordings/Admin/Data/Entities/RecordingDto";

export function mapRecordingDTO(dto: RecordingDto): RecordingEntity {
  return {
    Id: dto.id,
    Name: dto.name,
    Description: dto.description,
    Tier: dto.tier,
    Type: dto.recordingType,
    Created: dto.created,
    IsActive: dto.isActive,
  };
}

export function mapAddRecordingResult(dto: AddRecordingResult): AddRecordingResponse {
  return {
    RecordingId: dto.recordingId,
    UploadUrl: dto.uploadUrl,
  };
}
