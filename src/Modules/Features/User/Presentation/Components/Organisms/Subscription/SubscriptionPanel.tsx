import { Button, Card, Col, Container, Row } from "react-bootstrap";
import UseCancelSubscription from "@users/Presentation/Hooks/UseCancelSubscription";
import UseGetSubscription from "@users/Presentation/Hooks/UseGetSubscription";
import UseSubscribe from "@users/Presentation/Hooks/UseSubscribe";
import { useEffect } from "react";
import { SubscriptionErrors } from "@/Modules/Features/User/Domain/Errors/SubscriptionErrors";

export default function SubscriptionPanel() {

    const { checkoutURL, loading, error, subscribe } = UseSubscribe();
    const { subscription, loading: subscriptionLoading, error: subscriptionError, getSubscription } = UseGetSubscription();
    const { cancelSubscription, loading: cancelSubscriptionLoading, error: cancelSubscriptionError } = UseCancelSubscription();


    useEffect(() => {
        if (!subscription) {
            getSubscription();
        }
    }, []);

    useEffect(() => {
        if (checkoutURL) {
            window.open(checkoutURL, "_blank", "noopener,noreferrer");
        }
    }, [checkoutURL]);

    const handleSubscribe = () => {
        subscribe();
    };

    const handleCancelSubscription = () => {
        cancelSubscription();
    };

    console.log(subscription)

    const renderSubDetails = () => {
        if (subscriptionError === SubscriptionErrors.SUBSCRIPTION_NOT_FOUND) {
            return <Row className='justify-content-center align-items-center d-flex'>
                <Col md={6} sm={12} lg={6} className='mt-sm-2'>
                    <span>Estado: No tienes una suscripción activa</span>
                </Col>
                <Col md={6} sm={12} lg={6}>
                    <Row className='justify-content-center align-items-center d-flex'>
                        <Col md={12} sm={12} lg={12} className='mt-2 mt-sm-2'>
                            <Button variant="primary" onClick={handleSubscribe}>Suscribirse</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        } else {
            return <Row className='justify-content-center align-items-center d-flex'>
                <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                    <span>Estado: Activa</span>
                </Col>
                <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                    <span>Fecha de renovacion: 2026-02-13</span>
                </Col>
                <Col md={4} sm={12} lg={4}>
                    <Row className='justify-content-center align-items-center d-flex'>
                        <Col md={4} sm={12} lg={4} className='mt-2 mt-sm-2'>
                            <Button variant="danger" onClick={handleCancelSubscription}>Cancelar Suscripción</Button>
                        </Col>
                        <Col md={4} sm={12} lg={4} className='mt-2 mt-sm-2'>
                            <Button variant="primary">Ver Facturas</Button>
                        </Col>
                        <Col md={4} sm={12} lg={4} className='mt-2 mt-sm-2'>
                            <Button variant="primary">Gestionar Suscripción</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        }
    }

    if (loading || subscriptionLoading || cancelSubscriptionLoading) {
        return (
            <Row className='justify-content-center mt-5 align-items-center d-flex'>
                <Col md={12} lg={12}>
                    <Container>
                        <Card className='profile-card'>
                            <Card.Header>
                                <h2>Mi Suscripción</h2>
                            </Card.Header>
                            <Card.Body>
                                <Row className='justify-content-center align-items-center d-flex'>
                                    <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                                        <span>Cargando...</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </Col>
            </Row>
        );
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
                            {renderSubDetails()}
                        </Card.Body>
                    </Card>

                </Container>
            </Col>
        </Row>
    );
}