import { useContext, useState } from "react";
import { CancelSubscriptionContext } from "@users/Presentation/Context/CancelSubscriptionContext";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

export default function UseCancelSubscription() {

    const useCase = useContext(CancelSubscriptionContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<SubscriptionErrors | null>(null);

    const cancelSubscription = async () => {
        setLoading(true);
        const result = await useCase.Execute();
        let success = false;
        result.match(
            () => {
                success = true;
                setError(null);
            },
            (error) => setError(error)
        );
        setLoading(false);
        return success;
    };

    return {
        loading,
        error,
        cancelSubscription
    };
}
