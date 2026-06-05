import { Result } from "neverthrow";
import { IToggleRecordingStatusUseCase } from "@admin/recordings/Application/UseCases/ToggleRecordingStatus/IToggleRecordingStatusUseCase";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";

export default class ToggleRecordingStatusUseCaseImpl implements IToggleRecordingStatusUseCase {
    constructor(private readonly Repository: IRecordingsRepository) { }

    public async Execute(id: string, activate: boolean): Promise<Result<void, RecordingsErrors>> {
        if (activate) {
            return this.Repository.ActivateRecording(id);
        }
        return this.Repository.DeactivateRecording(id);
    }
}