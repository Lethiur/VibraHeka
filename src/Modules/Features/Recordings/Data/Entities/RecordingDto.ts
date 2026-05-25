import { RecordingType, RecordingTier } from "@recordings/Domain/Entities/RecordingEntity.ts";

export { RecordingTier };

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    recordingType: RecordingType;
    tier: RecordingTier;
}