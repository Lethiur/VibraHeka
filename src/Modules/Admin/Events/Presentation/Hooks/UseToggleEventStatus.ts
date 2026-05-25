import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ToggleEventStatusContext from "@admin/events/Presentation/Context/ToggleEventStatusContext";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import { EVENTS_QUERY_KEY } from "@admin/events/Presentation/Hooks/UseGetEvents";

export default function UseToggleEventStatus() {
    const UseCase = useContext(ToggleEventStatusContext);
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<EventsErrors | null>(null);

    const ToggleStatus = async (id: string, activate: boolean): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await UseCase.Execute(id, activate);
            if (result.isOk()) {
                await queryClient.invalidateQueries({ queryKey: EVENTS_QUERY_KEY });
                return true;
            }
            setError(result.error);
            return false;
        } catch {
            setError(EventsErrors.TOGGLE_STATUS_FAILED);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { ToggleStatus, loading, error };
}
