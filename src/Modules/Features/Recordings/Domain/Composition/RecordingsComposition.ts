import RecordingsDatasource from "@recordings/Data/Datasources/RecordingsDatasource";
import RecordingsRepositoryImpl from "@recordings/Data/Repositories/RecordingsRepositoryImpl";
import { GetRecordingsUseCase } from "@recordings/Application/UseCases/GetRecordings/GetRecordingsUseCase";
import { GetRecordingUrlUseCase } from "@recordings/Application/UseCases/GetRecordingUrl/GetRecordingUrlUseCase";

const datasource = new RecordingsDatasource();
const repository = new RecordingsRepositoryImpl(datasource);

export const getRecordingsUseCase = new GetRecordingsUseCase(repository);
export const getRecordingUrlUseCase = new GetRecordingUrlUseCase(repository);
