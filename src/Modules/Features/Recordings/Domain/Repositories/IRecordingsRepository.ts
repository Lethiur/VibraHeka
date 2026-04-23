import {RecordingsErrors} from "@recordings/Domain/Errors/RecordingsErrors.ts";
import {RecordingEntity} from "@recordings/Domain/Entities/RecordingEntity.ts";
import {Result} from "neverthrow";

export default interface IRecordingsRepository {
    
    GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>>
    
    GetRecordingUrl(recordingId: string): Promise<Result<string, RecordingsErrors>>
}