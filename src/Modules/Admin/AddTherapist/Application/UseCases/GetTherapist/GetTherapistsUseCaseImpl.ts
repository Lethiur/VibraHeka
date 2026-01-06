import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase.ts";
import { Result } from "neverthrow";
import Therapist from "../../../Domain/Entities/Therapist";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors.ts";
import {ITherapistRepository} from "@admin/addTherapist/Domain/Repositories/ITherapistRepository.ts";

export default class GetTherapistsUseCaseImpl implements IGetTherapistsUseCase {

    constructor(private Repository : ITherapistRepository) {
    }
    
    execute(): Promise<Result<Therapist[], TherapistsErrors>> {
        return this.Repository.GetAllTherapists();
    }
    
}