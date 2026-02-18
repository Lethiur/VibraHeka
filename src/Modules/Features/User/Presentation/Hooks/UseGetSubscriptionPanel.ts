import { useContext, useState } from "react";
import { GetSubscriptionPanelContext } from "../Context/GetSubscriptionPanelContext";

export default function UseGetSubscriptionPanel() {

    const getSubscriptionPanelUseCase = useContext(GetSubscriptionPanelContext);

    const [subscriptionPanel, setSubscriptionPanel] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const getSubscriptionPanel = async () => {
        setLoading(true);
        const result = await getSubscriptionPanelUseCase.Execute();
        result.match(
            (subscriptionPanel) => {
                setSubscriptionPanel(subscriptionPanel);
                setLoading(false);
            },
            (error) => {
                setError(error);
                setLoading(false);
            }
        );
    };

    return {
        subscriptionPanel,
        loading,
        error,
        getSubscriptionPanel
    };

}