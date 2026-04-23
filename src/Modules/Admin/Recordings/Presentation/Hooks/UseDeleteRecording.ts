import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DeleteRecordingContext from "@admin/recordings/Presentation/Context/DeleteRecordingContext";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import { RECORDINGS_QUERY_KEY } from "@admin/recordings/Presentation/Hooks/UseGetRecordings";

export default function UseDeleteRecording() {
    const UseCase = useContext(DeleteRecordingContext);
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<RecordingsErrors | null>(null);

    const DeleteRecording = async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await UseCase.Execute(id);
            if (result.isOk()) {
                await queryClient.invalidateQueries({ queryKey: RECORDINGS_QUERY_KEY });
                return true;
            }
            setError(result.error);
            return false;
        } catch {
            setError(RecordingsErrors.DELETE_FAILED);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { DeleteRecording, loading, error };
}

