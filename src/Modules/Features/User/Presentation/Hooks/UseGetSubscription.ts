import { useContext } from "react";
import { GetSubscriptionContext } from "@users/Presentation/Context/GetSubscriptionContext";
import Subscription from "@users/Domain/Entities/Subscription";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import GenericUseQuery from "@core/Presentation/Hooks/GenericUseQuery";

export default function UseGetSubscription() {
    const useCase = useContext(GetSubscriptionContext);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const { data, isLoading, error, refetch } = GenericUseQuery<Subscription, string>(
        ["subscription"],
        async () => useCase.Execute(),
        {
            enabled: isAuthenticated,
            refetchInterval: 1000 * 60,
        }
    );

    return {
        subscription: data ?? null,
        loading: isAuthenticated ? isLoading : false,
        error: error ?? null,
        getSubscription: refetch
    };
}
