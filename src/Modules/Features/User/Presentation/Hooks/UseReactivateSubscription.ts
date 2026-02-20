import { useContext, useState } from "react";
import { ReactivateSubscriptionContext } from "@users/Presentation/Context/ReactivateSubscriptionContext";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

export default function UseReactivateSubscription() {

    const useCase = useContext(ReactivateSubscriptionContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<SubscriptionErrors | null>(null);

    const reactivateSubscription = async () => {
        setLoading(true);
        const result = await useCase.Execute();
        let success = false;
        result.match(
            () => {
                success = true;
                setError(null);
            },
            (err) => setError(err)
        );
        setLoading(false);
        return success;
    };

    return {
        loading,
        error,
        reactivateSubscription
    };
}
