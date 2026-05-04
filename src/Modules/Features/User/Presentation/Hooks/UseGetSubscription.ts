import { useContext } from "react";
import { GetSubscriptionContext } from "@users/Presentation/Context/GetSubscriptionContext";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";

export default function UseGetSubscription() {
    const useCase = useContext(GetSubscriptionContext);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    // Usamos useQuery para gestionar el estado global de la suscripción
    const { data, isLoading, error, refetch } = useQuery<ISubscription, string>({
        queryKey: ["subscription"], // Esta clave es el "ID" en la caché
        queryFn: async () => {
            const result = await useCase.Execute();
            return result.match(
                (subscription) => subscription,
                (err) => { throw err; } // Lanzamos para que React Query active 'isError'
            );
        },
        enabled: isAuthenticated, // Solo hacer fetch si está autenticado
        retry: false,
        refetchInterval: 1000 * 60, // Considerar los datos "frescos" por 1 min
    });

    return {
        subscription: data ?? null,
        loading: isAuthenticated ? isLoading : false,
        error: error ?? null,
        getSubscription: refetch // Reemplazamos tu función manual por el refetch de la librería
    };
}
