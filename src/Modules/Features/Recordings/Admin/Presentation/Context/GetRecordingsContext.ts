import { createContext } from "react";
import { getRecordingsUseCase } from "@/Modules/Features/Recordings/Admin/Domain/Composition/RecordingsComposition";
import { IGetRecordingsUseCase } from "@/Modules/Features/Recordings/Admin/Application/UseCases/GetRecordings/IGetRecordingsUseCase";

const GetRecordingsContext = createContext<IGetRecordingsUseCase>(getRecordingsUseCase);

export default GetRecordingsContext;

