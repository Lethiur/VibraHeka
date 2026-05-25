import { RecordingType, RecordingTier } from "@recordings/Domain/Entities/RecordingEntity.ts";

export { RecordingTier };

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    type: RecordingType;
    tier: RecordingTier;
}