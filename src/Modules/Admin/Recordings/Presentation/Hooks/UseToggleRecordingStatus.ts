import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ToggleRecordingStatusContext from "@admin/recordings/Presentation/Context/ToggleRecordingStatusContext";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { RECORDINGS_QUERY_KEY } from "@admin/recordings/Presentation/Hooks/UseGetRecordings";

export default function UseToggleRecordingStatus() {
    const UseCase = useContext(ToggleRecordingStatusContext);
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<RecordingsErrors | null>(null);

    const ToggleStatus = async (id: string, activate: boolean): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await UseCase.Execute(id, activate);
            if (result.isOk()) {
                await queryClient.invalidateQueries({ queryKey: RECORDINGS_QUERY_KEY });
                return true;
            }
            setError(result.error);
            return false;
        } catch {
            setError(RecordingsErrors.TOGGLE_STATUS_FAILED);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { ToggleStatus, loading, error };
}