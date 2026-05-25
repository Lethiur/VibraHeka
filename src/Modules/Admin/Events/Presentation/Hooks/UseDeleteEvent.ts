import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DeleteEventContext from "@admin/events/Presentation/Context/DeleteEventContext";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import { EVENTS_QUERY_KEY } from "@admin/events/Presentation/Hooks/UseGetEvents";

export default function UseDeleteEvent() {
    const UseCase = useContext(DeleteEventContext);
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<EventsErrors | null>(null);

    const DeleteEvent = async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await UseCase.Execute(id);
            if (result.isOk()) {
                await queryClient.invalidateQueries({ queryKey: EVENTS_QUERY_KEY });
                return true;
            }
            setError(result.error);
            return false;
        } catch {
            setError(EventsErrors.DELETE_FAILED);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { DeleteEvent, loading, error };
}
