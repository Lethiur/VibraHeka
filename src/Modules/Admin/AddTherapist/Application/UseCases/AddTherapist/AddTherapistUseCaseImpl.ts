import {IAddTherapistUseCase} from "@admin/addTherapist/Application/UseCases/AddTherapist/IAddTherapistUseCase.ts";
import { Result } from "neverthrow";
import { CreateTherapistEntity } from "../../../Domain/Entities/CreateTherapistEntity";
import { TherapistsErrors } from "../../../Domain/Errors/TherapistsErrors";
import {ITherapistRepository} from "@admin/addTherapist/Domain/Repositories/ITherapistRepository.ts";
import CreateTherapistRequestValidator
    from "@admin/addTherapist/Application/Validators/CreateTherapistRequestValidator.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError.ts";


/**
 * Implementation of the IAddTherapistUseCase interface.
 * This class provides the behavior to handle the use case
 * of adding a new therapist to the system. It encapsulates the
 * business logic and is responsible for processing the input data,
 * performing necessary validations, and returning the result of the operation.
 *
 * The `execute` method is the entry point for performing the operation
 * of adding a therapist, taking in the required data and returning
 * a Promise indicating the result of the operation or possible errors.
 */
export default class AddTherapistUseCaseImpl implements IAddTherapistUseCase {
    
    constructor(private Respository : ITherapistRepository, private Validator : CreateTherapistRequestValidator) {
    }

    /**
     * Executes the creation of a therapist entity.
     *
     * @param {CreateTherapistEntity} data - The data for the therapist entity to be created.
     * @return {Promise<Result<string, TherapistsErrors>>} A promise that resolves to the result of the operation, either successful or with errors.
     */
    execute(data: CreateTherapistEntity): Promise<Result<string, TherapistsErrors>> {
        
        const validate : ValidationErrors<CreateTherapistEntity> = this.Validator.validate(data);
        
        if (Object.keys(validate).length > 0) {
            throw new InvalidEntityError(validate);
        }
        
        return this.Respository.CreateTherapist(data);
        
    }
}