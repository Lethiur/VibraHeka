import { Result, ok, err } from "neverthrow";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { IUploadRecordingUseCase } from "@admin/recordings/Application/UseCases/UploadRecording/IUploadRecordingUseCase";
import CreateRecordingValidator from "@admin/recordings/Application/Validators/CreateRecordingValidator";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";

export default class UploadRecordingUseCaseImpl implements IUploadRecordingUseCase {
    constructor(
        private readonly Repository: IRecordingsRepository,
        private readonly Validator: CreateRecordingValidator,
    ) { }

    public async Execute(data: CreateRecordingEntity, onProgress: (progress: number) => void): Promise<Result<string, RecordingsErrors>> {
        const validationResult = this.Validator.validate(data);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        const addResult = await this.Repository.UploadRecording(data);
        if (addResult.isErr()) {
            return err(addResult.error);
        }

        const { RecordingId, UploadUrl } = addResult.value;
        const uploadResult = await this.Repository.UploadRecordingVideo(UploadUrl, data.File!, onProgress);
        if (uploadResult.isErr()) {
            return err(uploadResult.error);
        }

        return ok(RecordingId);
    }
}

