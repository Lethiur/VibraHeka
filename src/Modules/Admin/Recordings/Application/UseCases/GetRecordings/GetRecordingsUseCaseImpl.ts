import { Result } from "neverthrow";
import { IGetRecordingsUseCase } from "@admin/recordings/Application/UseCases/GetRecordings/IGetRecordingsUseCase";
import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";

export default class GetRecordingsUseCaseImpl implements IGetRecordingsUseCase {
    constructor(private readonly Repository: IRecordingsRepository) { }

    public async Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>> {
        return this.Repository.GetRecordings();
    }
}

