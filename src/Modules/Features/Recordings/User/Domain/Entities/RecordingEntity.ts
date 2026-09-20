export enum RecordingType {
    MEDITACION,
    MASTERCLASS,
    TALLER,
}

export enum RecordingTier {
    FREE = 0,
    PREMIUM = 1,
    DISCOUNT_FOR_MEMBERS = 2,
}

export interface RecordingEntity {
    Id: string;
    Name: string;
    Description: string;
    Type: RecordingType;
    Tier: RecordingTier;
}
