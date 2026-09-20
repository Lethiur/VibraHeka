import { IGetRecordingUrlUseCase } from "@/Modules/Features/Recordings/User/Application/UseCases/GetRecordingUrl/IGetRecordingUrlUseCase";
import { Result } from "neverthrow";
import { RecordingsErrors } from "@/Modules/Features/Recordings/User/Domain/Errors/RecordingsErrors";
import IRecordingsRepository from "@/Modules/Features/Recordings/User/Domain/Repositories/IRecordingsRepository";

export class GetRecordingUrlUseCase implements IGetRecordingUrlUseCase {
    constructor(private readonly recordingsRepository: IRecordingsRepository) {}

    async Execute(recordingId: string): Promise<Result<string, RecordingsErrors>> {
        return await this.recordingsRepository.GetRecordingUrl(recordingId);
    }
}
