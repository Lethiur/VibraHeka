import { RecordingsApiErrors } from "@/Modules/Features/Recordings/Admin/Data/Errors/RecordingsApiErrors";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";

export const API_ERROR_MAP: Partial<Record<RecordingsApiErrors, RecordingsErrors>> = {
    [RecordingsApiErrors.UNAUTHORIZED]: RecordingsErrors.UNAUTHORIZED,
    [RecordingsApiErrors.NETWORK_ERROR]: RecordingsErrors.NETWORK_ERROR,
    [RecordingsApiErrors.INVALID_FORM]: RecordingsErrors.UPLOAD_FAILED,
    [RecordingsApiErrors.UNKNOWN_ERROR]: RecordingsErrors.GENERAL_ERROR,
};
