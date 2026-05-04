import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import GetRecordingsContext from "@recordings/Presentation/Context/GetRecordingsContext";
import { RecordingEntity } from "@recordings/Domain/Entities/RecordingEntity";
import { RecordingsErrors } from "@recordings/Domain/Errors/RecordingsErrors";

export const RECORDINGS_QUERY_KEY = ["user_recordings"];

export default function UseGetRecordings() {
    const UseCase = useContext(GetRecordingsContext);
    const queryClient = useQueryClient();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const { data, isLoading, error } = useQuery<RecordingEntity[], RecordingsErrors>({
        queryKey: RECORDINGS_QUERY_KEY,
        enabled: isAuthenticated,
        queryFn: async () => {
            console.log("Fetching recordings data...");
            const result = await UseCase.Execute();
            if (result.isErr()) throw result.error;
            return result.value;
        },
    });

    const refetch = () => {
        if (!isAuthenticated) return Promise.resolve();
        return queryClient.invalidateQueries({ queryKey: RECORDINGS_QUERY_KEY });
    };

    return {
        recordings: data ?? [],
        loading: isAuthenticated ? isLoading : false,
        error: isAuthenticated ? (error as RecordingsErrors | null) : null,
        refetch,
    };
}
