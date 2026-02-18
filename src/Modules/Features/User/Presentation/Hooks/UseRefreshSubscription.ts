import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { GetSubscriptionContext } from "@users/Presentation/Context/GetSubscriptionContext";
import { OrderStatus } from "../../Domain/Enums/OrderStatus";

export default function UseRefreshSubscription(isWaiting: boolean) {

    const useCase = useContext(GetSubscriptionContext);
    const queryClient = useQueryClient();
    const [isProcessing, setIsProcessing] = useState(false);
    // 1. Iniciamos el temporizador de 3 segundos
    useEffect(() => {
        if (!isWaiting) return;

        setIsProcessing(true);
        let attempts = 0;

        const interval = setInterval(async () => {
            attempts++;
            const result = await useCase.Execute();

            result.match(
                (details) => {
                    // Si el estado cambió (ej. de 'pending' a 'active')
                    if (details.Status !== OrderStatus.PENDING) {
                        // MAGIC: Actualizamos la caché global con la clave que usa el Hook inicial
                        queryClient.setQueryData(["subscription"], details);
                        stopPolling();
                    }
                },
                () => { /* Ignoramos errores de red durante el polling */ }
            );

            if (attempts >= 50) stopPolling(); // 3 segundos
        }, 500);

        const stopPolling = () => {
            clearInterval(interval);
            setIsProcessing(false);
        };

        return () => clearInterval(interval);
    }, [isWaiting, useCase, queryClient]);

    return { isProcessing };
}