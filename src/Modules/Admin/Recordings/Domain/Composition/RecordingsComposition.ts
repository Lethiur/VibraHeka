import GetRecordingsUseCaseImpl from "@admin/recordings/Application/UseCases/GetRecordings/GetRecordingsUseCaseImpl";
import DeleteRecordingUseCaseImpl from "@admin/recordings/Application/UseCases/DeleteRecording/DeleteRecordingUseCaseImpl";
import ToggleRecordingStatusUseCaseImpl from "@admin/recordings/Application/UseCases/ToggleRecordingStatus/ToggleRecordingStatusUseCaseImpl";
import RecordingsDatasource from "@admin/recordings/Data/Datasources/RecordingsDatasource";
import RecordingsRepositoryImpl from "@admin/recordings/Data/Repositories/RecordingsRepositoryImpl";
import { IGetRecordingsUseCase } from "@admin/recordings/Application/UseCases/GetRecordings/IGetRecordingsUseCase";
import { IDeleteRecordingUseCase } from "@admin/recordings/Application/UseCases/DeleteRecording/IDeleteRecordingUseCase";
import { IToggleRecordingStatusUseCase } from "@admin/recordings/Application/UseCases/ToggleRecordingStatus/IToggleRecordingStatusUseCase";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";

const datasource: RecordingsDatasource = new RecordingsDatasource();
const repository: IRecordingsRepository = new RecordingsRepositoryImpl(datasource);

export const getRecordingsUseCase: IGetRecordingsUseCase = new GetRecordingsUseCaseImpl(repository);
export const deleteRecordingUseCase: IDeleteRecordingUseCase = new DeleteRecordingUseCaseImpl(repository);
export const toggleRecordingStatusUseCase: IToggleRecordingStatusUseCase = new ToggleRecordingStatusUseCaseImpl(repository);

