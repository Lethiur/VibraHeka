import { Result } from "neverthrow";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";

export interface IDeleteRecordingUseCase {
    Execute(id: string): Promise<Result<void, RecordingsErrors>>;
}

