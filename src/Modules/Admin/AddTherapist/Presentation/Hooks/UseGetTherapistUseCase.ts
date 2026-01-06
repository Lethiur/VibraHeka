import {useContext, useState} from "react";
import {GetTherapistUseCaseContext} from "@admin/addTherapist/Presentation/Context/GetTherapistUseCaseContext.ts";
import {IGetTherapistsUseCase} from "@admin/addTherapist/Application/UseCases/GetTherapist/IGetTherapistsUseCase.ts";
import Therapist from "@admin/addTherapist/Domain/Entities/Therapist.ts";
import {Result} from "neverthrow";
import {TherapistsErrors} from "@admin/addTherapist/Domain/Errors/TherapistsErrors.ts";


interface UseTherapistReturn {
    TherapistList: Therapist[] | null;
    Loading: boolean;
    Error: TherapistsErrors | null;
    GetTherapists: () => Promise<void>;
}

/**
 * Custom hook for managing the state and execution of the GetTherapist use case.
 * It provides state variables for the therapist list, loading status, and error,
 * as well as a method to fetch therapists.
 *
 * @return {UseTherapistReturn} An object containing:
 * - `TherapistList`: A stateful array of therapists.
 * - `Loading`: A boolean representing the loading state of the fetch operation.
 * - `Error`: Any error encountered while fetching therapists.
 * - `GetTherapists`: A function to initiate the fetching of therapists.
 */
export default function UseGetTherapistUseCase() : UseTherapistReturn {

    const context: IGetTherapistsUseCase = useContext(GetTherapistUseCaseContext);

    const [TherapistList, setTherapistList] = useState<Therapist[]>([]);
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState<TherapistsErrors | null>(null);

    async function GetTherapists(): Promise<void> {
        setLoading(true);
        const result: Result<Therapist[], TherapistsErrors> = await context.execute();
        result.match(therapists => setTherapistList(therapists), (err) => setError(err));
        setLoading(false);
    }
    
    return {TherapistList, Loading, Error, GetTherapists};
}