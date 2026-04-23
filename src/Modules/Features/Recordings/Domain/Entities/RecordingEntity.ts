export enum RecordingType {
    MEDITACION,
    MASTERCLASS,
    TALLER,
}

export interface RecordingEntity {
    Id: string;
    Name: string;
    Description: string;
    Type: RecordingType;
}
