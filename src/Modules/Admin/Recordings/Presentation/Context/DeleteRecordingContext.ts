import { createContext } from "react";
import { deleteRecordingUseCase } from "@admin/recordings/Domain/Composition/RecordingsComposition";
import { IDeleteRecordingUseCase } from "@admin/recordings/Application/UseCases/DeleteRecording/IDeleteRecordingUseCase";

const DeleteRecordingContext = createContext<IDeleteRecordingUseCase>(deleteRecordingUseCase);

export default DeleteRecordingContext;

