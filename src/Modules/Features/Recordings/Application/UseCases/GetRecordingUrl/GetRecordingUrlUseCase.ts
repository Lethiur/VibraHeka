import { IGetRecordingUrlUseCase } from "@recordings/Application/UseCases/GetRecordingUrl/IGetRecordingUrlUseCase";
import { Result } from "neverthrow";
import { RecordingsErrors } from "@recordings/Domain/Errors/RecordingsErrors";
import IRecordingsRepository from "@recordings/Domain/Repositories/IRecordingsRepository";

export class GetRecordingUrlUseCase implements IGetRecordingUrlUseCase {
    constructor(private readonly recordingsRepository: IRecordingsRepository) {}

    async Execute(recordingId: string): Promise<Result<string, RecordingsErrors>> {
        return await this.recordingsRepository.GetRecordingUrl(recordingId);
    }
}
