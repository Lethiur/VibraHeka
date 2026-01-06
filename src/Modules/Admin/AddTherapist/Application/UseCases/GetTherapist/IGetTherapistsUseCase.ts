import Therapist from "@admin/addTherapist/Domain/Entities/Therapist.ts";
import {Result} from "neverthrow";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors.ts";

export interface IGetTherapistsUseCase {
    
    execute(): Promise<Result<Therapist[], TherapistsErrors>>;
}