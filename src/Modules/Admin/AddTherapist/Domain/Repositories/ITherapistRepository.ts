import {Result} from "neverthrow";
import Therapist from "@admin/addTherapist/Domain/Entities/Therapist";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors";
import {CreateTherapistEntity} from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";

/**
 * Interface representing a repository for managing therapist data.
 */
export interface ITherapistRepository
{
    /**
     * Retrieves a list of all therapists available in the system.
     *
     * @return {Promise<Result<Therapist[], TherapistsErrors>>} A promise that resolves with a result containing either an array of Therapist objects on success or an error of type TherapistsErrors on failure.
     */
    GetAllTherapists() : Promise<Result<Therapist[], TherapistsErrors>>;

    /**
     * Creates a new therapist record in the system.
     *
     * @param {Therapist} therapist - The therapist object containing the necessary information to create a new therapist record.
     * @return {Promise<Result<string, TherapistsErrors>>} A promise that resolves with a result object containing either the ID of the newly created therapist as a string, or an error of type TherapistsErrors.
     */
    CreateTherapist(therapist : CreateTherapistEntity) : Promise<Result<string, TherapistsErrors>>;
    
}