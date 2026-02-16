import { useContext, useState } from "react";
import { GetSubscriptionContext } from "@users/Presentation/Context/GetSubscriptionContext";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

export default function UseGetSubscription() {

    const useCase = useContext(GetSubscriptionContext);

    const [subscription, setSubscription] = useState<ISubscription | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<SubscriptionErrors | null>(null);

    const getSubscription = async () => {
        setLoading(true);
        const result = await useCase.Execute();
        result.match(
            (subscription) => {
                setSubscription(subscription);
                setError(null);
            },
            (error) => setError(error)
        );
        setLoading(false);
    };

    return {
        subscription,
        loading,
        error,
        getSubscription
    };
}
