import {RecordingsErrors} from "@/Modules/Features/Recordings/User/Domain/Errors/RecordingsErrors";
import {RecordingEntity} from "@/Modules/Features/Recordings/User/Domain/Entities/RecordingEntity";
import {Result} from "neverthrow";

export default interface IRecordingsRepository {
    
    GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>>
    
    GetRecordingUrl(recordingId: string): Promise<Result<string, RecordingsErrors>>
}