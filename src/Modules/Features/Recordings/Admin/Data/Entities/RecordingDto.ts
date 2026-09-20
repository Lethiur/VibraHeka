import { RecordingType, RecordingTier } from "@/Modules/Features/Recordings/User/Domain/Entities/RecordingEntity";

export { RecordingTier };

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    type: RecordingType;
    tier: RecordingTier;
}