import { Result, ResultAsync } from "neverthrow";
import { API_ERROR_MAP } from "@admin/recordings/Data/Errors/ErrorMap";
import { RecordingsApiErrors } from "@admin/recordings/Data/Errors/RecordingsApiErrors";
import RecordingsDatasource from "@admin/recordings/Data/Datasources/RecordingsDatasource";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";
import AddRecordingResponse from "@admin/recordings/Domain/Entities/AddRecordingResponse.ts";
import { RecordingDto } from "@admin/recordings/Data/Entities/RecordingDto";
import { mapAddRecordingResult, mapRecordingDTO } from "@admin/recordings/Data/Mappers/RecordingMapper";
import { SellableItemType } from "@admin/catalog/Domain/Entities/CatalogEntities";

export default class RecordingsRepositoryImpl implements IRecordingsRepository {
    constructor(private readonly Datasource: RecordingsDatasource = new RecordingsDatasource()) {
    }

    public async UploadRecordingVideo(url: string, data: File, onProgress?: (progress: number) => void): Promise<Result<void, RecordingsErrors>> {
        const result = await this.Datasource.UploadRecordingVideo(url, data, onProgress);
        return result.mapErr(() => RecordingsErrors.UPLOAD_FAILED);
    }

    public async UploadRecording(data: CreateRecordingEntity): Promise<Result<AddRecordingResponse, RecordingsErrors>> {
        console.log("RecordingsRepositoryImpl: UploadRecording called with data:", data);
        let resultAsync = await this.Datasource.UploadRecording({
            name: data.Name,
            description: data.Description,
            tier: data.Tier,
            type: data.Type,
            price: data.Price,
            currencyCode: data.CurrencyCode,
        });
        console.log("UploadRecording result from datasource:", resultAsync);
        return resultAsync.map(mapAddRecordingResult).mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.GENERAL_ERROR);
    }

    public async GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>> {
        const result = await this.Datasource.GetRecordings();

        return result
            .map((dto: RecordingDto[]): RecordingEntity[] => dto.map(mapRecordingDTO))
            .mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.LIST_FAILED);
    }

    public async DeleteRecording(id: string): Promise<Result<void, RecordingsErrors>> {
        return ResultAsync.fromPromise(this.Datasource.DeleteRecording(id), () => RecordingsErrors.DELETE_FAILED)
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.DELETE_FAILED);
    }

    public async ActivateRecording(id: string): Promise<Result<void, RecordingsErrors>> {
        return ResultAsync.fromPromise(
            this.Datasource.ActivateRecording({ productID: id, productType: SellableItemType.DigitalRecording }),
            () => RecordingsErrors.TOGGLE_STATUS_FAILED,
        )
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.TOGGLE_STATUS_FAILED);
    }

    public async DeactivateRecording(id: string): Promise<Result<void, RecordingsErrors>> {
        return ResultAsync.fromPromise(
            this.Datasource.DeactivateRecording({ productID: id, productType: SellableItemType.DigitalRecording }),
            () => RecordingsErrors.TOGGLE_STATUS_FAILED,
        )
            .andThen((result) => result)
            .mapErr((error) => API_ERROR_MAP[error as RecordingsApiErrors] ?? RecordingsErrors.TOGGLE_STATUS_FAILED);
    }
}
