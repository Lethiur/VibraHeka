import { useContext } from "react";
import { ReactivateSubscriptionContext } from "@users/Presentation/Context/ReactivateSubscriptionContext";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";

export default function UseReactivateSubscription() {

    const useCase = useContext(ReactivateSubscriptionContext);

    const mutation = GenericUseMutation<void>(
        ["subscription-panel"],
        useCase.Execute
    );

    return {
        success: mutation.success,
        loading: mutation.loading,
        error: mutation.error,
        reactivateSubscription: mutation.executeAsync
    };
}
