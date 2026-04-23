import CreateRecordingValidator from "@admin/recordings/Application/Validators/CreateRecordingValidator";
import { IUploadRecordingUseCase } from "@admin/recordings/Application/UseCases/UploadRecording/IUploadRecordingUseCase";
import UploadRecordingUseCaseImpl from "@admin/recordings/Application/UseCases/UploadRecording/UploadRecordingUseCaseImpl";
import RecordingsDatasource from "@admin/recordings/Data/Datasources/RecordingsDatasource";
import RecordingsRepositoryImpl from "@admin/recordings/Data/Repositories/RecordingsRepositoryImpl";
import { IRecordingsRepository } from "@admin/recordings/Domain/Repositories/IRecordingsRepository";

const datasource: RecordingsDatasource = new RecordingsDatasource();
const repository: IRecordingsRepository = new RecordingsRepositoryImpl(datasource);
const uploadRecordingUseCase: IUploadRecordingUseCase = new UploadRecordingUseCaseImpl(repository, new CreateRecordingValidator());

export default uploadRecordingUseCase;

