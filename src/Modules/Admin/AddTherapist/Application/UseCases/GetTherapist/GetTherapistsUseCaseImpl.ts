import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase";
import { Result } from "neverthrow";
import Therapist from "../../../Domain/Entities/Therapist";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors";
import {ITherapistRepository} from "@admin/addTherapist/Domain/Repositories/ITherapistRepository";

export default class GetTherapistsUseCaseImpl implements IGetTherapistsUseCase {

    constructor(private Repository : ITherapistRepository) {
    }
    
    execute(): Promise<Result<Therapist[], TherapistsErrors>> {
        return this.Repository.GetAllTherapists();
    }
    
}