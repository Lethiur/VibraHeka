import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GetRecordingsContext from "@/Modules/Features/Recordings/Admin/Presentation/Context/GetRecordingsContext";
import { RecordingEntity } from "@/Modules/Features/Recordings/Admin/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@/Modules/Features/Recordings/Admin/Domain/Errors/RecordingsErrors";

export const RECORDINGS_QUERY_KEY = ["recordings"];

export default function UseGetRecordings() {
    const UseCase = useContext(GetRecordingsContext);
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery<RecordingEntity[], RecordingsErrors>({
        queryKey: RECORDINGS_QUERY_KEY,
        queryFn: async () => {
            const result = await UseCase.Execute();
            if (result.isErr()) throw result.error;
            return result.value;
        },
    });

    const refetch = () => queryClient.invalidateQueries({ queryKey: RECORDINGS_QUERY_KEY });

    return {
        recordings: data ?? [],
        loading: isLoading,
        error: error as RecordingsErrors | null,
        refetch,
    };
}

