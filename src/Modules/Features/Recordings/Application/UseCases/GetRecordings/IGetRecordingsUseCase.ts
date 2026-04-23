import { Result } from "neverthrow";
import { RecordingEntity } from "@recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@recordings/Domain/Errors/RecordingsErrors";

export interface IGetRecordingsUseCase {
    Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>>;
}
