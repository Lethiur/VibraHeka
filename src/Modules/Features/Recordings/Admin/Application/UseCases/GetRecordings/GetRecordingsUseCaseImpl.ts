import { Result } from "neverthrow";
import { IGetRecordingsUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/GetRecordings/IGetRecordingsUseCase";
import { RecordingEntity } from "@/Modules/Features/Recordings/Admin/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@/Modules/Features/Recordings/Admin/Domain/Repositories/IRecordingsRepository";

export default class GetRecordingsUseCaseImpl implements IGetRecordingsUseCase {
    constructor(private readonly Repository: IRecordingsRepository) { }

    public async Execute(): Promise<Result<RecordingEntity[], RecordingsErrors>> {
        const result = await this.Repository.GetRecordings();
        if(result.isOk()) {
            console.log("GetRecordingsUseCase: Successfully retrieved recordings:", result.value);
        }
        return result;
    }
}

