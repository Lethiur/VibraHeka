import { useContext } from "react";
import { SubscribeContext } from "@users/Presentation/Context/SubscribeContext";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import { useMutation } from "@tanstack/react-query";
import ISubscriptionCreation from "@users/Domain/Entities/ISubscriptionCreation";

export default function UseSubscribe() {

    const useCase = useContext(SubscribeContext);

    const mutation = useMutation<ISubscriptionCreation, SubscriptionErrors, void>({
        mutationFn: async () => {
            const result = await useCase.Execute();
            return result.match(
                (subscriptionCreation) => subscriptionCreation,
                (error) => { return Promise.reject(error); }
            );
        }
    });

    return {
        // Mapeamos las propiedades de React Query a tu nomenclatura anterior
        checkoutURL: mutation.data?.Url ?? null,
        checkoutURLExpiresAt: mutation.data?.ExpiresAt ?? null,
        loading: mutation.isPending, // En v5 se usa isPending en lugar de isLoading
        error: mutation.error,
        subscribe: mutation.mutate // O mutation.mutateAsync si necesitas esperar el resultado
    };
}
