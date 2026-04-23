import { createContext } from "react";
import uploadRecordingUseCase from "@admin/recordings/Domain/Composition/UploadRecordingComposition";

const UploadRecordingContext = createContext(uploadRecordingUseCase);

export default UploadRecordingContext;

