import { Result } from "neverthrow";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export interface IUploadRecordingUseCase {
    Execute(data: CreateRecordingEntity, onProgress: (progress: number) => void): Promise<Result<string, RecordingsErrors>>;
}

