import { RecordingsApiErrors } from "@admin/recordings/Data/Errors/RecordingsApiErrors";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";

export const API_ERROR_MAP: Partial<Record<RecordingsApiErrors, RecordingsErrors>> = {
    [RecordingsApiErrors.UNAUTHORIZED]: RecordingsErrors.UNAUTHORIZED,
    [RecordingsApiErrors.NETWORK_ERROR]: RecordingsErrors.NETWORK_ERROR,
    [RecordingsApiErrors.INVALID_FORM]: RecordingsErrors.UPLOAD_FAILED,
    [RecordingsApiErrors.UNKNOWN_ERROR]: RecordingsErrors.GENERAL_ERROR,
};
