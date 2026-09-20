import { Result } from "neverthrow";
import { RecordingEntity } from "@/Modules/Features/Recordings/User/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/User/Domain/Errors/RecordingsErrors";

export interface IGetRecordingsUseCase {
    Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>>;
}
