import { Result } from "neverthrow";
import { CreateRecordingEntity } from "@/Modules/Features/Recordings/Admin/Domain/Entities/CreateRecordingEntity";
import { RecordingEntity } from "@/Modules/Features/Recordings/Admin/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";
import AddRecordingResponse from "@/Modules/Features/Recordings/Admin/Domain/Entities/AddRecordingResponse";

export interface IRecordingsRepository {
    UploadRecording(data: CreateRecordingEntity): Promise<Result<AddRecordingResponse, RecordingsErrors>>;
    UploadRecordingVideo(url: string, data: File, onProgress?: (progress: number) => void) : Promise<Result<void, RecordingsErrors>>;
    GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>>;
    DeleteRecording(id: string): Promise<Result<void, RecordingsErrors>>;
    ActivateRecording(id: string): Promise<Result<void, RecordingsErrors>>;
    DeactivateRecording(id: string): Promise<Result<void, RecordingsErrors>>;
}
