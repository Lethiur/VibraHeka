import Therapist from "@admin/addTherapist/Domain/Entities/Therapist";
import {Result} from "neverthrow";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors";

/**
 * Interface representing the use case for retrieving a list of therapists.
 *
 * The `IGetTherapistsUseCase` defines the contract for an operation that fetches therapists
 * based on specified business logic and returns the result encapsulated within a `Result` object.
 *
 * It uses the `execute` method to initiate this process and provides a promise
 * that resolves to a result containing either a list of therapists or an error.
 *
 * Key components:
 * - `Therapist[]`: Represents an array of therapists that are successfully retrieved.
 * - `TherapistsErrors`: Represents possible errors that might be encountered during retrieval.
 * - `Result`: A wrapper to manage success or error states, making it easier to handle outcomes.
 */
export interface IGetTherapistsUseCase {

    /**
     * Executes the process to retrieve a list of therapists.
     *
     * @return {Promise<Result<Therapist[], TherapistsErrors>>} A promise that resolves to a Result object containing either an array of therapists on success or an error object of type TherapistsErrors on failure.
     */
    execute(): Promise<Result<Therapist[], TherapistsErrors>>;
}