import { Card, Col, Row } from "react-bootstrap";
import UseCancelSubscription from "@users/Presentation/Hooks/UseCancelSubscription";
import UseGetSubscription from "@users/Presentation/Hooks/UseGetSubscription";
import UseSubscribe from "@users/Presentation/Hooks/UseSubscribe";
import { useEffect, useState } from "react";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import UseGetSubscriptionPanel from "@users/Presentation/Hooks/UseGetSubscriptionPanel";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import UseRefreshSubscription from "@users/Presentation/Hooks/UseRefreshSubscription";
import { OrderStatus } from "@users/Domain/Enums/OrderStatus";
import SubscriptionDetails from "@/Modules/Features/User/Presentation/Components/Molecules/SubscriptionDetails/SubscriptionDetails";
import UseReactivateSubscription from "../../../Hooks/UseReactivateSubscription";

interface SubscriptionPanelProps {
    timeZone: string;
}

export default function SubscriptionPanel({ timeZone }: SubscriptionPanelProps) {
    const [waitingForStripe, setWaitingForStripe] = useState(false);

    const { checkoutURL, loading, error, subscribe } = UseSubscribe();
    const { subscription, loading: subscriptionLoading, error: subscriptionError, getSubscription } = UseGetSubscription();
    const { cancelSubscription, loading: cancelSubscriptionLoading, error: cancelSubscriptionError } = UseCancelSubscription();
    const { getSubscriptionPanel, loading: getSubscriptionPanelLoading, error: getSubscriptionPanelError, subscriptionPanel } = UseGetSubscriptionPanel();
    const { reactivateSubscription, loading: reactivateSubscriptionLoading, error: reactivateSubscriptionError } = UseReactivateSubscription();
    const { isProcessing: isPaymentPending } = UseRefreshSubscription(waitingForStripe);

    useEffect(() => {
        if (!subscription) {
            getSubscription();
        }
    }, []);

    useEffect(() => {
        if (subscription?.Status === OrderStatus.PENDING) {
            setWaitingForStripe(true);
        }
    }, [subscription]);

    useEffect(() => {
        if (checkoutURL) {
            window.open(checkoutURL, "_self");
        }
    }, [checkoutURL]);

    useEffect(() => {
        if (subscriptionPanel) {
            window.open(subscriptionPanel, "_blank");
        }
    }, [subscriptionPanel]);

    const handleSubscribe = () => {
        subscribe();
        setWaitingForStripe(true);
    };

    const handleCancelSubscription = () => {
        cancelSubscription();
        getSubscription();
    };

    const handleGetSubscriptionPanel = () => {
        getSubscriptionPanel();
    };

    const handleReactivateSubscription = () => {
        reactivateSubscription().then((_) => {
            getSubscription();
        });
    };

    const isInitialLoading = subscriptionLoading && !subscription;
    const isLoading = () => {
        return (
            subscriptionLoading ||
            cancelSubscriptionLoading ||
            getSubscriptionPanelLoading ||
            loading ||
            reactivateSubscriptionLoading
        );
    };

    const renderSubscriptionSkeleton = () => (
        <Row className="g-3 justify-content-center align-items-center">
            <Col md={12} lg={12}>
                <div className="vh-skeleton vh-skeleton-line mb-3"></div>
            </Col>
            <Col md={4} sm={12} lg={4}>
                <div className="vh-skeleton vh-skeleton-pill"></div>
            </Col>
            <Col md={4} sm={12} lg={4}>
                <div className="vh-skeleton vh-skeleton-pill"></div>
            </Col>
            <Col md={4} sm={12} lg={4}>
                <div className="vh-skeleton vh-skeleton-button"></div>
            </Col>
        </Row>
    );

    const renderCardBody = () => {
        if (isInitialLoading || (isLoading() && !isPaymentPending)) {
            return renderSubscriptionSkeleton();
        }

        return (
            <Row className="g-3 justify-content-center align-items-center">
                {subscriptionError !== SubscriptionErrors.SUBSCRIPTION_NOT_FOUND && (
                    <Col md={12} sm={12} lg={12}>
                        <ErrorBox
                            message={subscriptionError || cancelSubscriptionError || getSubscriptionPanelError || error || reactivateSubscriptionError}
                            variant="danger"
                        />
                    </Col>
                )}

                <Col md={12} sm={12} lg={12}>
                    <SubscriptionDetails
                        handleReactivateSubscription={handleReactivateSubscription}
                        subscription={subscription}
                        timeZone={timeZone}
                        handleSubscribe={handleSubscribe}
                        handleCancelSubscription={handleCancelSubscription}
                        handleGetSubscriptionPanel={handleGetSubscriptionPanel}
                    />
                </Col>
            </Row>
        );
    };

    return (
        <Row className="justify-content-center align-items-center mt-2 mt-md-4">
            <Col md={12} lg={12}>
                <Card className="profile-card vh-panel vh-surface-card">
                    <Card.Header>
                        <h2>Mi Suscripcion</h2>
                    </Card.Header>
                    <Card.Body>{renderCardBody()}</Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
