export enum RecordingType {
    MEDITACION,
    MASTERCLASS,
    TALLER,
}

export enum RecordingTier {
    FREE,
    PREMIUM,
    DISCOUNT_FOR_MEMBERS
}

export interface CreateRecordingEntity {
    Name: string;
    Description: string;
    Type: RecordingType;
    Tier: RecordingTier;
    File: File | null;
}
