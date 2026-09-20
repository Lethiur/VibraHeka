import { createContext } from "react";
import { getRecordingUrlUseCase } from "@/Modules/Features/Recordings/User/Domain/Composition/RecordingsComposition";
import { IGetRecordingUrlUseCase } from "@/Modules/Features/Recordings/User/Application/UseCases/GetRecordingUrl/IGetRecordingUrlUseCase";

const GetRecordingUrlContext = createContext<IGetRecordingUrlUseCase>(getRecordingUrlUseCase);

export default GetRecordingUrlContext;
