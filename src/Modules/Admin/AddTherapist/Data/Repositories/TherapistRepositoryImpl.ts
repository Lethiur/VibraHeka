import { ITherapistRepository } from "@admin/addTherapist/Domain/Repositories/ITherapistRepository";
import { Result } from "neverthrow";
import Therapist from "../../Domain/Entities/Therapist";
import { TherapistsErrors } from "../../Domain/Errors/TherapistsErrors";
import TherapistDatasource from "@admin/addTherapist/Data/Datasources/TherapistDatasource";
import { TherapistDTO } from "@admin/addTherapist/Data/Models/TherapistDTO";
import { TherapistAPIErrors } from "@admin/addTherapist/Data/Errors/TherapistAPIErrors";
import { API_ERROR_MAP } from "@admin/addTherapist/Data/Errors/ErrorMap";
import { ICreateTherapistDTO } from "@/Modules/Admin/AddTherapist/Data/Models/ICreateTherapistDTO";
import { CreateTherapistEntity } from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";

/**
 * TherapistRepositoryImpl is responsible for providing implementations of the ITherapistRepository interface.
 * It includes methods to retrieve and create therapist records.
 */
export default class TherapistRepositoryImpl implements ITherapistRepository {

    constructor(private Datasource: TherapistDatasource) {
    }

    /**
     * Retrieves a list of all therapists.
     * @return {Promise<Result<Therapist[], TherapistsErrors>>} A promise that resolves with a result containing either an array of therapists or an error indicating the failure reason.
     */
    public async GetAllTherapists(): Promise<Result<Therapist[], TherapistsErrors>> {
        const getTherapistResult: Result<TherapistDTO[], TherapistAPIErrors> = await this.Datasource.GetAllTherapists();

        return getTherapistResult.map((dto: TherapistDTO[]) => {
            return dto.map(therapist => {
                return new Therapist({
                    Id: therapist.id,
                    FirstName: therapist.firstName,
                    LastName: therapist.lastName,
                    MiddleName: therapist.middleName,
                    Bio: therapist.bio,
                    Email: therapist.email,
                    TimezoneID: therapist.timezoneID
                })
            })
        }).mapErr(e => API_ERROR_MAP[e] ?? TherapistsErrors.GENERAL_ERROR);

    }

    /**
     * Creates a new therapist record in the system.
     *
     * @param therapist The therapist object containing all necessary details to create the record.
     * @return A Promise that resolves to a Result object containing either the ID of the created therapist (string) on success or an error (TherapistsErrors) on failure.
     */
    public async CreateTherapist(therapist: CreateTherapistEntity): Promise<Result<string, TherapistsErrors>> {

        const dto: ICreateTherapistDTO = {
            email: therapist.Email,
            firstName: therapist.FirstName,
            middleName: therapist.MiddleName,
            lastName: therapist.LastName,
            phoneNumber: therapist.PhoneNumber,
            bio: therapist.Bio,
            timezoneID: therapist.TimezoneID,
        };

        const result: Result<string, TherapistAPIErrors> = await this.Datasource.CreateTherapist(dto);

        return result.map(id => id).mapErr(e => API_ERROR_MAP[e] ?? TherapistsErrors.GENERAL_ERROR);

    }

}