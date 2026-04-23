import { Result } from "neverthrow";
import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export interface IGetRecordingsUseCase {
    Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>>;
}

