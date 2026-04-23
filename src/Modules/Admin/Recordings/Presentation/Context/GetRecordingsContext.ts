import { createContext } from "react";
import { getRecordingsUseCase } from "@admin/recordings/Domain/Composition/RecordingsComposition";
import { IGetRecordingsUseCase } from "@admin/recordings/Application/UseCases/GetRecordings/IGetRecordingsUseCase";

const GetRecordingsContext = createContext<IGetRecordingsUseCase>(getRecordingsUseCase);

export default GetRecordingsContext;

