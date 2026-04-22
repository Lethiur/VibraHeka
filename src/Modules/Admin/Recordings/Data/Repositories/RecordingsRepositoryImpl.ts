import { Result, ResultAsync } from "neverthrow";
import { API_ERROR_MAP } from "@admin/recordings/Data/Errors/ErrorMap";
import { RecordingsApiErrors } from "@admin/recordings/Data/Errors/RecordingsApiErrors";
import RecordingsDatasource from "@admin/recordings/Data/Datasources/RecordingsDatasource";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";

export default class RecordingsRepositoryImpl implements IRecordingsRepository {
    constructor(private readonly Datasource: RecordingsDatasource = new RecordingsDatasource()) { }

    public async UploadRecording(data: CreateRecordingEntity): Promise<Result<string, RecordingsErrors>> {
        return ResultAsync.fromPromise(this.Datasource.UploadRecording(data), () => RecordingsErrors.GENERAL_ERROR)
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.GENERAL_ERROR);
    }

    public async GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>> {
        return ResultAsync.fromPromise(this.Datasource.GetRecordings(), () => RecordingsErrors.LIST_FAILED)
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.LIST_FAILED);
    }

    public async DeleteRecording(id: string): Promise<Result<void, RecordingsErrors>> {
        return ResultAsync.fromPromise(this.Datasource.DeleteRecording(id), () => RecordingsErrors.DELETE_FAILED)
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.DELETE_FAILED);
    }
}
