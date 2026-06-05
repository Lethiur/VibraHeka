import {RecordingTier, RecordingType} from "@admin/recordings/Domain/Entities/CreateRecordingEntity";

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    recordingType: RecordingType;
    tier: RecordingTier;
    created: string;
    isActive: boolean;
}

