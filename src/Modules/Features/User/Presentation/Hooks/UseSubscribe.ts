import { useContext } from "react";
import { SubscribeContext } from "@users/Presentation/Context/SubscribeContext";
import ISubscriptionCreation from "@users/Domain/Entities/ISubscriptionCreation";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation";

export default function UseSubscribe() {

    const useCase = useContext(SubscribeContext);

    const mutation = GenericUseMutation<ISubscriptionCreation>(
        ["subscription-url"],
        () => useCase.Execute()
    );

    return {
        checkoutURL: mutation.data?.Url ?? null,
        checkoutURLExpiresAt: mutation.data?.ExpiresAt ?? null,
        loading: mutation.loading,
        error: mutation.error,
        subscribe: mutation.execute
    };
}
