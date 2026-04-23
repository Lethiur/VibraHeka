import { createContext } from "react";
import { getRecordingsUseCase } from "@recordings/Domain/Composition/RecordingsComposition";
import { IGetRecordingsUseCase } from "@recordings/Application/UseCases/GetRecordings/IGetRecordingsUseCase";

const GetRecordingsContext = createContext<IGetRecordingsUseCase>(getRecordingsUseCase);

export default GetRecordingsContext;
