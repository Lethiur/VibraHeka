import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GetEventsContext from "@admin/events/Presentation/Context/GetEventsContext";
import { EventEntity } from "@admin/events/Domain/Entities/EventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";

export const EVENTS_QUERY_KEY = ["admin_events"];

function getDefaultFromDate(): string {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString();
}

function getDefaultToDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 365);
    return d.toISOString();
}

export default function UseGetEvents() {
    const UseCase = useContext(GetEventsContext);
    const queryClient = useQueryClient();

    const fromDate = getDefaultFromDate();
    const toDate = getDefaultToDate();

    const { data, isLoading, error } = useQuery<EventEntity[], EventsErrors>({
        queryKey: EVENTS_QUERY_KEY,
        queryFn: async () => {
            const result = await UseCase.Execute(fromDate, toDate);
            if (result.isErr()) throw result.error;
            return result.value;
        },
    });

    const refetch = () => queryClient.invalidateQueries({ queryKey: EVENTS_QUERY_KEY });

    return {
        events: data ?? [],
        loading: isLoading,
        error: error as EventsErrors | null,
        refetch,
    };
}
