import { Result } from "neverthrow";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export interface IRecordingsRepository {
    UploadRecording(data: CreateRecordingEntity): Promise<Result<string, RecordingsErrors>>;
}

