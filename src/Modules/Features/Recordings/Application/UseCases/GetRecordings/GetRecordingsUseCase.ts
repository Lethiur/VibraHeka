import { IGetRecordingsUseCase } from "@recordings/Application/UseCases/GetRecordings/IGetRecordingsUseCase";
import { Result } from "neverthrow";
import { RecordingEntity } from "@recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@recordings/Domain/Errors/RecordingsErrors";
import IRecordingsRepository from "@recordings/Domain/Repositories/IRecordingsRepository";

export class GetRecordingsUseCase implements IGetRecordingsUseCase {
    constructor(private readonly recordingsRepository: IRecordingsRepository) {}

    async Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>> {
        return await this.recordingsRepository.GetRecordings();
    }
}
