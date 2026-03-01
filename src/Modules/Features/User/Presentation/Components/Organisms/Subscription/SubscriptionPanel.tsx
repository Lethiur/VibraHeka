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
            window.open(checkoutURL, "_self");
        }
    }, [checkoutURL]);

    useEffect(() => {
        if (subscriptionPanel) {
            window.open(subscriptionPanel, "_self");
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
        reactivateSubscription().then(_ => {
            getSubscription();
        });
    };




    const isInitialLoading = subscriptionLoading && !subscription;
    const isLoading = () => {
        return subscriptionLoading || cancelSubscriptionLoading || getSubscriptionPanelLoading || loading || isPaymentPending || reactivateSubscriptionLoading;
    };

    const renderSubscriptionSkeleton = () => (
        <Row className='justify-content-center align-items-center d-flex'>
            <Col md={12} lg={12}>
                <div className="skeleton skeleton-line mb-3"></div>
            </Col>
            <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                <div className="skeleton skeleton-pill"></div>
            </Col>
            <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                <div className="skeleton skeleton-pill"></div>
            </Col>
            <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                <div className="skeleton skeleton-button"></div>
            </Col>
        </Row>
    );


    const renderCardBody = () => {
        if (isInitialLoading) {
            return renderSubscriptionSkeleton();
        }

        return <Row className='justify-content-center align-items-center d-flex'>
            {subscriptionError !== SubscriptionErrors.SUBSCRIPTION_NOT_FOUND && <Col md={12} sm={12} lg={12} className='mt-2 mt-sm-2'>
                <ErrorBox message={subscriptionError || cancelSubscriptionError || getSubscriptionPanelError || error || reactivateSubscriptionError} variant="danger" />
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
                    <SubscriptionDetails handleReactivateSubscription={handleReactivateSubscription} subscription={subscription} timeZone={timeZone} handleSubscribe={handleSubscribe} handleCancelSubscription={handleCancelSubscription} handleGetSubscriptionPanel={handleGetSubscriptionPanel} />
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
