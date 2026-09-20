import IRecordingsRepository from "@/Modules/Features/Recordings/User/Domain/Repositories/IRecordingsRepository";
import { Result } from "neverthrow";
import { RecordingEntity } from "@/Modules/Features/Recordings/User/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/User/Domain/Errors/RecordingsErrors";
import RecordingsDatasource from "@/Modules/Features/Recordings/User/Data/Datasources/RecordingsDatasource";
import { RecordingDto } from "@/Modules/Features/Recordings/User/Data/Entities/RecordingDto";
import RecordingEntityMapper from "@/Modules/Features/Recordings/User/Data/Mappers/RecordingEntityMapper";
import RecordingUrlDto from "@/Modules/Features/Recordings/User/Data/Entities/RecordingUrlDto";

export default class RecordingsRepositoryImpl implements IRecordingsRepository {

    private readonly RecordingEntityMapper: RecordingEntityMapper;

    constructor(private readonly Datasource: RecordingsDatasource) {
        this.RecordingEntityMapper = new RecordingEntityMapper();
    }

    public async GetRecordings(): Promise<Result<RecordingEntity[], RecordingsErrors>> {
        const datasourceResult: Result<RecordingDto[], string> = await this.Datasource.GetRecordings();
        return datasourceResult.map((recordings) => recordings.map(this.RecordingEntityMapper.ToDomain)).mapErr((err) => err as RecordingsErrors);
    }

    public async GetRecordingUrl(recordingId: string): Promise<Result<string, RecordingsErrors>> {
        const datasourceResult: Result<RecordingUrlDto, string> = await this.Datasource.GetRecordingUrl(recordingId);
        return datasourceResult.map((recordingUrl) => recordingUrl.downloadUrl).mapErr((err) => err as RecordingsErrors);
    }
}