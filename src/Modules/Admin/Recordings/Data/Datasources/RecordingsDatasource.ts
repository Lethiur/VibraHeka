import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import {Result} from "neverthrow";
import {CreateRecordingEntity} from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import AddRecordingResult from "@admin/recordings/Data/Entities/AddRecordingResult";
import {RecordingDto} from "@admin/recordings/Data/Entities/RecordingDto.ts";

export default class RecordingsDatasource extends BackendDatasource {
    public async UploadRecording(data: CreateRecordingEntity): Promise<Result<AddRecordingResult, string>> {
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Description", data.Description);
        formData.append("Type", String(data.Type));
        formData.append("File", data.File as Blob);
        formData.append("FileName", data.FileName);

        return this.post<AddRecordingResult>("/recordings", formData, true);
    }

    public async GetRecordings(): Promise<Result<RecordingDto[], string>> {
        return this.get<RecordingDto[]>("/recordings", true);
    }

    public async DeleteRecording(id: string): Promise<Result<void, string>> {
        return this.delete<void>(`/recordings/${id}`, true);
    }
}
