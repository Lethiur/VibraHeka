import { Result } from "neverthrow";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export interface IRecordingsRepository {
    UploadRecording(data: CreateRecordingEntity): Promise<Result<string, RecordingsErrors>>;
    GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>>;
    DeleteRecording(id: string): Promise<Result<void, RecordingsErrors>>;
}
