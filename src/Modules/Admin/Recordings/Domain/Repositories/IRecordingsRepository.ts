import { Result } from "neverthrow";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import AddRecordingResponse from "@admin/recordings/Domain/Entities/AddRecordingResponse.ts";

export interface IRecordingsRepository {
    UploadRecording(data: CreateRecordingEntity): Promise<Result<AddRecordingResponse, RecordingsErrors>>;
    UploadRecordingVideo(url: string, data: File, onProgress?: (progress: number) => void) : Promise<Result<void, RecordingsErrors>>;
    GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>>;
    DeleteRecording(id: string): Promise<Result<void, RecordingsErrors>>;
}
