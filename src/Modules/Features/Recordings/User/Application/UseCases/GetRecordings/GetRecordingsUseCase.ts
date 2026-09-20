import { IGetRecordingsUseCase } from "@/Modules/Features/Recordings/User/Application/UseCases/GetRecordings/IGetRecordingsUseCase";
import { Result } from "neverthrow";
import { RecordingEntity } from "@/Modules/Features/Recordings/User/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/User/Domain/Errors/RecordingsErrors";
import IRecordingsRepository from "@/Modules/Features/Recordings/User/Domain/Repositories/IRecordingsRepository";

export class GetRecordingsUseCase implements IGetRecordingsUseCase {
    constructor(private readonly recordingsRepository: IRecordingsRepository) {}

    async Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>> {
        return await this.recordingsRepository.GetRecordings();
    }
}
