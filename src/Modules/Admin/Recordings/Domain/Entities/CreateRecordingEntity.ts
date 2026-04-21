export enum RecordingType {
    MEDITACION,
    MASTERCLASS,
    TALLER,
}

export interface CreateRecordingEntity {
    Name: string;
    Description: string;
    Type: RecordingType | null;
    File: File | null;
    FileName: string;
}
