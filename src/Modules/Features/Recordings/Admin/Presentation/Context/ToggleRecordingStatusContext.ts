import { createContext } from "react";
import { toggleRecordingStatusUseCase } from "@/Modules/Features/Recordings/Admin/Domain/Composition/RecordingsComposition";
import { IToggleRecordingStatusUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/ToggleRecordingStatus/IToggleRecordingStatusUseCase";

const ToggleRecordingStatusContext = createContext<IToggleRecordingStatusUseCase>(toggleRecordingStatusUseCase);

export default ToggleRecordingStatusContext;