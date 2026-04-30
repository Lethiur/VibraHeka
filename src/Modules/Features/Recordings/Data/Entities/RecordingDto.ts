import {RecordingType} from "@recordings/Domain/Entities/RecordingEntity.ts";

export enum RecordingTier {
    FREE = 0,
    PREMIUM = 1,
    DISCOUNT_FOR_MEMBERS = 2
}

export interface RecordingDto {
    id: string;
    name: string;
    description: string;
    type: RecordingType;
    tier: RecordingTier;
}