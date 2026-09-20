import { RecordingType } from "@/Modules/Features/Recordings/Admin/Domain/Entities/CreateRecordingEntity";
import { RecordingTier } from "@/Modules/Features/Recordings/Admin/Domain/Entities/CreateRecordingEntity";

export interface RecordingEntity {
    Id: string;
    Name: string;
    Description: string;
    Type: RecordingType;
    Tier: RecordingTier;
    Created: string;
    IsActive: boolean;
}

