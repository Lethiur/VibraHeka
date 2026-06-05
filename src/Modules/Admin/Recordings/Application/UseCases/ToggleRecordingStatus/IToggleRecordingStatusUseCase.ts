import { Result } from "neverthrow";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export interface IToggleRecordingStatusUseCase {
    Execute(id: string, activate: boolean): Promise<Result<void, RecordingsErrors>>;
}