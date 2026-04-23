import IRecordingsRepository from "@recordings/Domain/Repositories/IRecordingsRepository.ts";
import { Result } from "neverthrow";
import { RecordingEntity } from "@recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@recordings/Domain/Errors/RecordingsErrors";
import RecordingsDatasource from "@recordings/Data/Datasources/RecordingsDatasource.ts";
import { RecordingDto } from "@recordings/Data/Entities/RecordingDto.ts";
import RecordingEntityMapper from "@recordings/Data/Mappers/RecordingEntityMapper.ts";
import RecordingUrlDto from "@recordings/Data/Entities/RecordingUrlDto";

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