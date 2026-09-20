import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { GetSubscriptionContext } from "@users/Presentation/Context/GetSubscriptionContext";
import { OrderStatus } from "../../Domain/Enums/OrderStatus";

export default function UseRefreshSubscription(isWaiting: boolean) {

    const useCase = useContext(GetSubscriptionContext);
    const queryClient = useQueryClient();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!isWaiting) return;

        setIsProcessing(true);
        let attempts = 0;

        const interval = setInterval(async () => {
            attempts++;
            const result = await useCase.Execute();
            result.match(
                (details) => {
                    if (!details.isPaymentPending()) {
                        queryClient.setQueryData(["subscription"], details);
                        stopPolling();
                    }
                },
                () => { /* Ignoramos errores de red durante el polling */ }
            );

            if (attempts >= 30) {
                stopPolling();
                result.andTee(value => {
                    if (value.isPaymentPending()) {
                        value.Status = OrderStatus.ENABLED_FOR_RETRY;
                        queryClient.setQueryData(["subscription"], value);
                    }
                })
            };
        }, 200);

        const stopPolling = () => {
            clearInterval(interval);
            setIsProcessing(false);
        };

        return () => clearInterval(interval);
    }, [isWaiting, useCase, queryClient]);

    return { isProcessing };
}