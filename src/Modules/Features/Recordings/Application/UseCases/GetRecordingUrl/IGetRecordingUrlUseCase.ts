import { Result } from "neverthrow";
import { RecordingsErrors } from "@recordings/Domain/Errors/RecordingsErrors";

export interface IGetRecordingUrlUseCase {
    Execute(recordingId: string): Promise<Result<string, RecordingsErrors>>;
}
