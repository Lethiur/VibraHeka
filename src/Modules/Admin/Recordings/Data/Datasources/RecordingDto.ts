import { RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";

export interface RecordingDto {
    Id: string;
    Name: string;
    Description: string;
    Type: RecordingType;
    Created: string;
}

