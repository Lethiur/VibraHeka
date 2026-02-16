import { useContext, useState } from "react";
import { SubscribeContext } from "@users/Presentation/Context/SubscribeContext";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

export default function UseSubscribe() {

    const useCase = useContext(SubscribeContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<SubscriptionErrors | null>(null);
    const [checkoutURL, setCheckoutURL] = useState<string | null>(null);

    const subscribe = async () => {
        setLoading(true);
        const result = await useCase.Execute();
        result.match(
            (url) => {
                setCheckoutURL(url);
                setError(null);
            },
            (error) => setError(error)
        );
        setLoading(false);
    };

    return {
        checkoutURL,
        loading,
        error,
        subscribe
    };
}
