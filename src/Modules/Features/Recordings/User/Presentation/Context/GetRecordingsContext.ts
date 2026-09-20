import { createContext } from "react";
import { getRecordingsUseCase } from "@/Modules/Features/Recordings/User/Domain/Composition/RecordingsComposition";
import { IGetRecordingsUseCase } from "@/Modules/Features/Recordings/User/Application/UseCases/GetRecordings/IGetRecordingsUseCase";

const GetRecordingsContext = createContext<IGetRecordingsUseCase>(getRecordingsUseCase);

export default GetRecordingsContext;
