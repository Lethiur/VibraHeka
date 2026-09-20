import {RecordingTier, RecordingType} from "@/Modules/Features/Recordings/Admin/Domain/Entities/CreateRecordingEntity";

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    recordingType: RecordingType;
    tier: RecordingTier;
    created: string;
    isActive: boolean;
}

