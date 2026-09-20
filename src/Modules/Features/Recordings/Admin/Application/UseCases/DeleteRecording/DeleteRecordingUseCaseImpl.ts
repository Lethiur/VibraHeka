import { Result } from "neverthrow";
import { IDeleteRecordingUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/DeleteRecording/IDeleteRecordingUseCase";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@/Modules/Features/Recordings/Admin/Domain/Repositories/IRecordingsRepository";

export default class DeleteRecordingUseCaseImpl implements IDeleteRecordingUseCase {
    constructor(private readonly Repository: IRecordingsRepository) { }

    public async Execute(id: string): Promise<Result<void, RecordingsErrors>> {
        return this.Repository.DeleteRecording(id);
    }
}

