import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";

export default class RecordingsDatasource extends BackendDatasource {
    public async UploadRecording(data: CreateRecordingEntity): Promise<Result<string, string>> {
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Description", data.Description);
        formData.append("Type", String(data.Type));
        formData.append("File", data.File as Blob);
        formData.append("FileName", data.FileName);

        return this.post<string>("/recordings", formData, true, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }
}

