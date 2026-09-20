import { Result } from "neverthrow";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";

export interface IToggleRecordingStatusUseCase {
    Execute(id: string, activate: boolean): Promise<Result<void, RecordingsErrors>>;
}