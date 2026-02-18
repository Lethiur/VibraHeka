import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
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

interface SubscriptionPanelProps {
    timeZone: string;
}

export default function SubscriptionPanel({ timeZone }: SubscriptionPanelProps) {

    const [waitingForStripe, setWaitingForStripe] = useState(false);

    const { checkoutURL, loading, error, subscribe } = UseSubscribe();
    const { subscription, loading: subscriptionLoading, error: subscriptionError, getSubscription } = UseGetSubscription();
    const { cancelSubscription, loading: cancelSubscriptionLoading, error: cancelSubscriptionError } = UseCancelSubscription();
    const { getSubscriptionPanel, loading: getSubscriptionPanelLoading, error: getSubscriptionPanelError, subscriptionPanel } = UseGetSubscriptionPanel();
    const { isProcessing: isPaymentPending } = UseRefreshSubscription(waitingForStripe);


    useEffect(() => {
        if (!subscription)
            getSubscription();
    }, []);


    useEffect(() => {
        if (subscription?.Status === OrderStatus.PENDING) {
            setWaitingForStripe(true);
        }
    }, [subscription]);

    useEffect(() => {
        if (checkoutURL) {
            window.open(checkoutURL, "_blank", "noopener,noreferrer");
        }
    }, [checkoutURL]);

    useEffect(() => {
        if (subscriptionPanel) {
            window.open(subscriptionPanel, "_blank", "noopener,noreferrer");
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




    const isLoading = () => {
        return subscriptionLoading || cancelSubscriptionLoading || getSubscriptionPanelLoading || loading || isPaymentPending;
    }


    const renderCardBody = () => {
        return <Row className='justify-content-center align-items-center d-flex'>
            {subscriptionError !== SubscriptionErrors.SUBSCRIPTION_NOT_FOUND && <Col md={12} sm={12} lg={12} className='mt-2 mt-sm-2'>
                <ErrorBox message={subscriptionError || cancelSubscriptionError || getSubscriptionPanelError || error} variant="danger" />
            </Col>}
            <Col md={12} sm={12} lg={12} className='mt-2 mt-sm-2'>

                {isLoading() &&
                    <div className="d-flex justify-content-center py-4">
                        <Spinner animation="border" />
                    </div>
                }

                {isPaymentPending &&
                    <div className="d-flex justify-content-center py-4">
                        Estamos procesando tu pago...
                    </div>
                }

                {!isLoading() && <>
                    <SubscriptionDetails subscription={subscription} timeZone={timeZone} handleSubscribe={handleSubscribe} handleCancelSubscription={handleCancelSubscription} handleGetSubscriptionPanel={handleGetSubscriptionPanel} />
                </>}
            </Col>
        </Row>
    }


    return (
        <Row className='justify-content-center mt-5 align-items-center d-flex'>
            <Col md={12} lg={12}>
                <Container>
                    <Card className='profile-card'>
                        <Card.Header>
                            <h2>Mi Suscripción</h2>
                        </Card.Header>
                        <Card.Body>

                            {renderCardBody()}
                        </Card.Body>
                    </Card>

                </Container>
            </Col>
        </Row>
    );
}
