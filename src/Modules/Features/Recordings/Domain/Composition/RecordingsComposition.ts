import GetRecordingsUseCaseImpl from "@/Modules/Features/Recordings/Admin/Application/UseCases/GetRecordings/GetRecordingsUseCaseImpl";
import DeleteRecordingUseCaseImpl from "@/Modules/Features/Recordings/Admin/Application/UseCases/DeleteRecording/DeleteRecordingUseCaseImpl";
import ToggleRecordingStatusUseCaseImpl from "@/Modules/Features/Recordings/Admin/Application/UseCases/ToggleRecordingStatus/ToggleRecordingStatusUseCaseImpl";
import RecordingsDatasource from "@/Modules/Features/Recordings/Admin/Data/Datasources/RecordingsDatasource";
import RecordingsRepositoryImpl from "@/Modules/Features/Recordings/Admin/Data/Repositories/RecordingsRepositoryImpl";
import { IGetRecordingsUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/GetRecordings/IGetRecordingsUseCase";
import { IDeleteRecordingUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/DeleteRecording/IDeleteRecordingUseCase";
import { IToggleRecordingStatusUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/ToggleRecordingStatus/IToggleRecordingStatusUseCase";
import { IRecordingsRepository } from "@/Modules/Features/Recordings/Admin/Domain/Repositories/IRecordingsRepository";

const datasource: RecordingsDatasource = new RecordingsDatasource();
const repository: IRecordingsRepository = new RecordingsRepositoryImpl(datasource);

export const getRecordingsUseCase: IGetRecordingsUseCase = new GetRecordingsUseCaseImpl(repository);
export const deleteRecordingUseCase: IDeleteRecordingUseCase = new DeleteRecordingUseCaseImpl(repository);
export const toggleRecordingStatusUseCase: IToggleRecordingStatusUseCase = new ToggleRecordingStatusUseCaseImpl(repository);

