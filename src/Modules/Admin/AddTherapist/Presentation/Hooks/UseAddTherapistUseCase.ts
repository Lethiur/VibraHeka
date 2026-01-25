import {useContext, useState} from "react";
import {CreateTherapistUseCaseContext} from "@admin/addTherapist/Presentation/Context/CreateTherapistUseCaseContext";
import {IAddTherapistUseCase} from "@admin/addTherapist/Application/UseCases/AddTherapist/IAddTherapistUseCase";
import {CreateTherapistEntity} from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors";
import {Result} from "neverthrow";

/**
 * Interface representing the return structure of the UseAddTherapist hook.
 *
 * @interface UseAddTherapistReturn
 *
 * @property {boolean} loading Indicates whether the therapist creation process is currently in progress.
 * @property {string} therapistID The unique identifier for the newly created therapist.
 * @property {TherapistsErrors | null} error Represents potential errors encountered during the therapist creation process.
 * @property {(data: CreateTherapistEntity) => Promise<void>} AddTherapist Function to initiate the therapist creation process.
 */
interface UseAddTherapistReturn {
    loading: boolean;
    therapistID: string;
    error: TherapistsErrors | null;
    AddTherapist: (data: CreateTherapistEntity) => Promise<void>;
}

/**
 * A custom hook that provides functionality to add a therapist using a given use case.
 * It includes state management for loading, error handling, and storing the added therapist's ID.
 *
 * @return {UseAddTherapistReturn} An object containing the current loading state, the therapist ID, any error encountered,
 *                                 and a method to add a therapist.
 */
export default function UseAddTherapistUseCase() : UseAddTherapistReturn {

    const [loading, setLoading] = useState<boolean>(false);
    const [therapistID, setTherapistID] = useState<string>("");
    const context: IAddTherapistUseCase = useContext(CreateTherapistUseCaseContext);
    const [error, setError] = useState<TherapistsErrors | null>(null);

    async function AddTherapist(data: CreateTherapistEntity): Promise<void> {
        setLoading(true);
        const result: Result<string, TherapistsErrors> = await context.execute(data);
        result.match(therapists => setTherapistID(therapists), (err) => setError(err));
        setLoading(false);
    }
    
    return {loading, therapistID, error, AddTherapist};

}