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

            result.andTee(value => console.log(value.Status))
            result.match(
                (details) => {
                    if (details.Status !== OrderStatus.PENDING) {
                        queryClient.setQueryData(["subscription"], details);
                        stopPolling();
                    }
                },
                () => { /* Ignoramos errores de red durante el polling */ }
            );

            if (attempts >= 30) {
                stopPolling();
                result.andTee(value => {
                    if (value.Status === OrderStatus.PENDING) {
                        value.Status = OrderStatus.ENABLED_FOR_RETRY;
                        queryClient.setQueryData(["subscription"], value);
                    }
                })
            }; // 3 segundos
        }, 200);

        const stopPolling = () => {
            clearInterval(interval);
            setIsProcessing(false);
        };

        return () => clearInterval(interval);
    }, [isWaiting, useCase, queryClient]);

    return { isProcessing };
}