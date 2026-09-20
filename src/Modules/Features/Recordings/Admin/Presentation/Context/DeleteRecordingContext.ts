import { createContext } from "react";
import { deleteRecordingUseCase } from "@/Modules/Features/Recordings/Admin/Domain/Composition/RecordingsComposition";
import { IDeleteRecordingUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/DeleteRecording/IDeleteRecordingUseCase";

const DeleteRecordingContext = createContext<IDeleteRecordingUseCase>(deleteRecordingUseCase);

export default DeleteRecordingContext;

