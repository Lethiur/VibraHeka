import { Result } from "neverthrow";
import { RecordingEntity } from "@/Modules/Features/Recordings/Admin/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";

export interface IGetRecordingsUseCase {
    Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>>;
}

