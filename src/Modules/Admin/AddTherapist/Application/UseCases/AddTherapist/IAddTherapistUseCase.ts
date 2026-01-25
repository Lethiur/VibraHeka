import {CreateTherapistEntity} from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors";
import {Result} from "neverthrow";

/**
 * Interface representing the use case for adding a new therapist.
 *
 * This interface specifies the contract for implementing the
 * addition of a therapist to the system. It defines a method
 * that takes in the required input data and returns a result
 * encapsulating either a success message or an error.
 *
 * @interface IAddTherapistUseCase
 */
export interface IAddTherapistUseCase {

    /**
     * Executes the operation to process the provided therapist entity data and returns a result.
     *
     * @param {CreateTherapistEntity} data - The data object containing information for creating a therapist entity.
     * @return {Promise<Result<string, TherapistsErrors>>} A promise that resolves to a Result object,
     * containing either a success message as a string or an error from TherapistsErrors.
     */
    execute(data: CreateTherapistEntity): Promise<Result<string, TherapistsErrors>>;
}