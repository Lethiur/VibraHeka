import { createContext } from "react";
import uploadRecordingUseCase from "@/Modules/Features/Recordings/Admin/Domain/Composition/UploadRecordingComposition";

const UploadRecordingContext = createContext(uploadRecordingUseCase);

export default UploadRecordingContext;

