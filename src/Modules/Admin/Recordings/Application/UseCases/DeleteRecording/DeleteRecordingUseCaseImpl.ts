import { Result } from "neverthrow";
import { IDeleteRecordingUseCase } from "@admin/recordings/Application/UseCases/DeleteRecording/IDeleteRecordingUseCase";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";

export default class DeleteRecordingUseCaseImpl implements IDeleteRecordingUseCase {
    constructor(private readonly Repository: IRecordingsRepository) { }

    public async Execute(id: string): Promise<Result<void, RecordingsErrors>> {
        return this.Repository.DeleteRecording(id);
    }
}

