import { RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";

export interface RecordingEntity {
    Id: string;
    Name: string;
    Description: string;
    Type: RecordingType;
    Created: string;
}

