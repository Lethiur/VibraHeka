import BackendDatasource from "@/Core/Data/Datasources/BackendDatasource";
import { Result } from "neverthrow";
import { TherapistAPIErrors } from "@admin/addTherapist/Data/Errors/TherapistAPIErrors";
import { TherapistDTO } from "@admin/addTherapist/Data/Models/TherapistDTO";
import { CreateTherapistDTO } from "@admin/addTherapist/Data/Models/CreateTherapistDTO";


/**
 * TherapistDatasource class is responsible for fetching therapist data
 * from the API and providing structured responses.
 * This class extends the ApiDatasource to utilize common API interaction methods.
 */
export default class TherapistDatasource extends BackendDatasource {

    /**
     * Fetches a list of all therapists from the server.
     *
     * @return {Promise<Result<TherapistDTO[], TherapistAPIErrors>>} A promise that resolves with a result containing either:
     * - An array of TherapistDTO objects if the operation is successful.
     * - A TherapistAPIErrors object if an error occurs during the operation.
     */
    public async GetAllTherapists(): Promise<Result<TherapistDTO[], TherapistAPIErrors>> {
        const result: Result<TherapistDTO[], string> = await this.get<TherapistDTO[]>('/admin/therapists', true)
        return result.mapErr(e => e as TherapistAPIErrors);
    }

    /**
     * Creates a new therapist using the provided data.
     *
     * @param {CreateTherapistDTO} data - The data required to create a therapist.
     * @return {Promise<Result<string, TherapistAPIErrors>>} A promise that resolves to a result containing either the ID of the created therapist or an error of type TherapistAPIErrors.
     */
    public async CreateTherapist(data: CreateTherapistDTO): Promise<Result<string, TherapistAPIErrors>> {
        const result: Result<string, string> = await this.put<string>('/admin/addTherapist', data, true);
        return result.mapErr(e => e as TherapistAPIErrors);
    }
}