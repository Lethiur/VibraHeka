import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import {ok, err, Result} from "neverthrow";
import axios from "axios";
import AddRecordingResult from "@admin/recordings/Data/Entities/AddRecordingResult";
import {RecordingDto} from "@admin/recordings/Data/Entities/RecordingDto.ts";
import CreateRecordingRequest from "../Entities/CreateRecordingRequest";
import { SellableItemType } from "@admin/catalog/Domain/Entities/CatalogEntities";

type ModifyProductVisibilityRequest = {
    productID: string;
    productType: SellableItemType;
};

export default class RecordingsDatasource extends BackendDatasource {
    public async UploadRecordingVideo(url: string, file: File, onProgress?: (progress: number) => void): Promise<Result<void, string>> {
        try {
            await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type
                },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        onProgress(percentCompleted);
                    }
                }
            });
            return ok(undefined);
        } catch (error) {
            return err("UPLOAD_FAILED");
        }
    }

    public async UploadRecording(data: CreateRecordingRequest): Promise<Result<AddRecordingResult, string>> {
        return this.post<AddRecordingResult>("catalog/recordings", data, true);
    }

    public async GetRecordings(): Promise<Result<RecordingDto[], string>> {
        return this.get<RecordingDto[]>("catalog/recordings/all", true);
    }


    public async DeleteRecording(id: string): Promise<Result<void, string>> {
        return this.delete<void>(`catalog/recordings/${id}`, true);
    }

    public async DeactivateRecording(request: ModifyProductVisibilityRequest): Promise<Result<void, string>> {
        return this.patch<void>("catalog/recordings/deactivate", request, true);
    }

    public async ActivateRecording(request: ModifyProductVisibilityRequest): Promise<Result<void, string>> {
        return this.patch<void>("catalog/recordings/activate", request, true);
    }
}
