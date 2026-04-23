import BackendDatasource from "@core/Data/Datasources/BackendDatasource.ts";
import { Result } from "neverthrow";
import { RecordingDto } from "@recordings/Data/Entities/RecordingDto.ts";
import RecordingUrlDto from "../Entities/RecordingUrlDto";

export default class RecordingsDatasource extends BackendDatasource {

    public async GetRecordings(): Promise<Result<RecordingDto[], string>> {
        return this.get<RecordingDto[]>("/recordings", true);
    }

    public async GetRecordingUrl(recordingId: string): Promise<Result<RecordingUrlDto, string>> {
        return this.get<RecordingUrlDto>(`/recordings/${recordingId}/download-url`, true);
    }
}