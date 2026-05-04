import { RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingTier } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";

export interface RecordingEntity {
    Id: string;
    Name: string;
    Description: string;
    Type: RecordingType;
    Tier: RecordingTier;
    Created: string;
}

