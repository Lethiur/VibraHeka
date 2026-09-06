import { useContext } from "react";
import { CancelSubscriptionContext } from "@users/Presentation/Context/CancelSubscriptionContext";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";

export default function UseCancelSubscription() {

    const useCase = useContext(CancelSubscriptionContext);

    const mutation = GenericUseMutation<void>(
        ["subscription-panel"],
        useCase.Execute
    );

    return {
        success: mutation.success,
        loading: mutation.loading,
        error: mutation.error,
        cancelSubscription: mutation.executeAsync
    };
}
