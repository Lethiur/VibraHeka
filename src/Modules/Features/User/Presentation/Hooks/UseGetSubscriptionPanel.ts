import { useContext } from "react";
import { GetSubscriptionPanelContext } from "../Context/GetSubscriptionPanelContext";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation";

export default function UseGetSubscriptionPanel() {

    const getSubscriptionPanelUseCase = useContext(GetSubscriptionPanelContext);

    const mutation = GenericUseMutation<string>(
        ["subscription-panel"],
        getSubscriptionPanelUseCase.Execute
    );

    return {
        subscriptionPanel: mutation.data ?? null,
        loading: mutation.loading,
        error: mutation.error,
        getSubscriptionPanel: mutation.executeAsync
    };

}