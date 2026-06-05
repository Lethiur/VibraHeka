import { createContext } from "react";
import { toggleRecordingStatusUseCase } from "@admin/recordings/Domain/Composition/RecordingsComposition";
import { IToggleRecordingStatusUseCase } from "@admin/recordings/Application/UseCases/ToggleRecordingStatus/IToggleRecordingStatusUseCase";

const ToggleRecordingStatusContext = createContext<IToggleRecordingStatusUseCase>(toggleRecordingStatusUseCase);

export default ToggleRecordingStatusContext;