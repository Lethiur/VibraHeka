import {RecordingTier, RecordingType} from "@admin/recordings/Domain/Entities/CreateRecordingEntity";

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    type: RecordingType;
    tier: RecordingTier;
    created: string;
}

