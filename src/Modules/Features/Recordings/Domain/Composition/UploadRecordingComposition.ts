import CreateRecordingValidator from "@/Modules/Features/Recordings/Admin/Application/Validators/CreateRecordingValidator";
import { IUploadRecordingUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/UploadRecording/IUploadRecordingUseCase";
import UploadRecordingUseCaseImpl from "@/Modules/Features/Recordings/Admin/Application/UseCases/UploadRecording/UploadRecordingUseCaseImpl";
import RecordingsDatasource from "@/Modules/Features/Recordings/Admin/Data/Datasources/RecordingsDatasource";
import RecordingsRepositoryImpl from "@/Modules/Features/Recordings/Admin/Data/Repositories/RecordingsRepositoryImpl";
import { IRecordingsRepository } from "@/Modules/Features/Recordings/Admin/Domain/Repositories/IRecordingsRepository";

const datasource: RecordingsDatasource = new RecordingsDatasource();
const repository: IRecordingsRepository = new RecordingsRepositoryImpl(datasource);
const uploadRecordingUseCase: IUploadRecordingUseCase = new UploadRecordingUseCaseImpl(repository, new CreateRecordingValidator());

export default uploadRecordingUseCase;

