import { Result } from "neverthrow";
import { RecordingsErrors } from "@/Modules/Features/Recordings/User/Domain/Errors/RecordingsErrors";

export interface IGetRecordingUrlUseCase {
    Execute(recordingId: string): Promise<Result<string, RecordingsErrors>>;
}
