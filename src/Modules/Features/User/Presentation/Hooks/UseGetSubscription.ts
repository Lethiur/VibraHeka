import { useContext } from "react";
import { GetSubscriptionContext } from "@users/Presentation/Context/GetSubscriptionContext";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { useQuery } from "@tanstack/react-query";

export default function UseGetSubscription() {
    const useCase = useContext(GetSubscriptionContext);

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
        retry: false,
        refetchInterval: 1000 * 60 * 5, // Considerar los datos "frescos" por 5 min
    });

    return {
        subscription: data ?? null,
        loading: isLoading,
        error: error ?? null,
        getSubscription: refetch // Reemplazamos tu función manual por el refetch de la librería
    };
}
