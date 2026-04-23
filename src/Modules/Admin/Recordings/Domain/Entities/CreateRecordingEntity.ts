export enum RecordingType {
    MEDITACION,
    MASTERCLASS,
    TALLER,
}

export interface CreateRecordingEntity {
    Name: string;
    Description: string;
    Type: RecordingType;
    File: File | null;
}
