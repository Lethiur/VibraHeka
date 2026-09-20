import { Result } from "neverthrow";
import { CreateRecordingEntity } from "@/Modules/Features/Recordings/Admin/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";

export interface IUploadRecordingUseCase {
    Execute(data: CreateRecordingEntity, onProgress: (progress: number) => void): Promise<Result<string, RecordingsErrors>>;
}

