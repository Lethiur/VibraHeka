import {RecordingType} from "@recordings/Domain/Entities/RecordingEntity.ts";

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    type: RecordingType;
}