import { Result } from "neverthrow";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export interface IDeleteRecordingUseCase {
    Execute(id: string): Promise<Result<void, RecordingsErrors>>;
}

