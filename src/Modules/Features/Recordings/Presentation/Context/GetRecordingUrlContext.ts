import { createContext } from "react";
import { getRecordingUrlUseCase } from "@recordings/Domain/Composition/RecordingsComposition";
import { IGetRecordingUrlUseCase } from "@recordings/Application/UseCases/GetRecordingUrl/IGetRecordingUrlUseCase";

const GetRecordingUrlContext = createContext<IGetRecordingUrlUseCase>(getRecordingUrlUseCase);

export default GetRecordingUrlContext;
