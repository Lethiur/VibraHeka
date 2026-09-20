import RecordingsDatasource from "@/Modules/Features/Recordings/User/Data/Datasources/RecordingsDatasource";
import RecordingsRepositoryImpl from "@/Modules/Features/Recordings/User/Data/Repositories/RecordingsRepositoryImpl";
import { GetRecordingsUseCase } from "@/Modules/Features/Recordings/User/Application/UseCases/GetRecordings/GetRecordingsUseCase";
import { GetRecordingUrlUseCase } from "@/Modules/Features/Recordings/User/Application/UseCases/GetRecordingUrl/GetRecordingUrlUseCase";

const datasource = new RecordingsDatasource();
const repository = new RecordingsRepositoryImpl(datasource);

export const getRecordingsUseCase = new GetRecordingsUseCase(repository);
export const getRecordingUrlUseCase = new GetRecordingUrlUseCase(repository);
