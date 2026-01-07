import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors.ts";
import { TherapistAPIErrors } from "./TherapistAPIErrors";

export const API_ERROR_MAP : Record<TherapistAPIErrors, TherapistsErrors> = {
    [TherapistAPIErrors.NOT_AUTHORIZED]: TherapistsErrors.NOT_AUTHORIZED,
}