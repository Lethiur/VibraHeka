import { SubscriptionStatus } from "@/Modules/Features/User/Domain/Enums/SubscriptionStatus";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

interface SubscriptionDetailsProps {
    subscription: ISubscription | null;
    timeZone: string;
    handleSubscribe: () => void;
    handleCancelSubscription: () => void;
    handleGetSubscriptionPanel: () => void;
    handleReactivateSubscription: () => void;
}

export default function SubscriptionDetails({ subscription, timeZone, handleSubscribe, handleCancelSubscription, handleGetSubscriptionPanel, handleReactivateSubscription }: SubscriptionDetailsProps) {

    const statusToString = () => {
        if (!subscription) {
            return "No tienes suscripcion";
        }

        switch (subscription?.SubscriptionStatus) {
            case SubscriptionStatus.ACTIVE:
                return "Estado:Activa";
            case SubscriptionStatus.TO_BE_CANCELLED:
                return "Estado: Pendiente de cancelacion";
            case SubscriptionStatus.CANCELLED:
                return "Estado: Cancelada";
            default:
                return "Desconocido";
        }
    }

    const formatEndDate = () => {
        const formato = new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: timeZone
        });
        return formato.format(new Date(subscription?.EndDate ?? ""));
    }

    const getSubscriptionButtons = () => {

        if (!subscription || subscription.SubscriptionStatus === SubscriptionStatus.CANCELLED) {
            return <> <Col md={12} sm={12} lg={12} className='mt-2 mt-sm-2'>
                <Button variant="primary" onClick={handleSubscribe}>Suscribirse</Button>
                {subscription && subscription.SubscriptionStatus === SubscriptionStatus.CANCELLED && (
                    <Button variant="primary" onClick={handleGetSubscriptionPanel}>Ver Facturas</Button>
                )}
            </Col></>
        }

        switch (subscription?.SubscriptionStatus) {
            case SubscriptionStatus.ACTIVE:
                return <><Col md={4} sm={12} lg={4} className='mt-2 mt-sm-2'>
                    <Button variant="danger" onClick={handleCancelSubscription}>Cancelar Suscripción</Button>
                </Col>
                    <Col md={4} sm={12} lg={4} className='mt-2 mt-sm-2'>
                        <Button variant="primary" onClick={handleGetSubscriptionPanel}>Ver Facturas</Button>
                    </Col>
                    <Col md={4} sm={12} lg={4} className='mt-2 mt-sm-2'>
                        <Button variant="primary" onClick={handleGetSubscriptionPanel}>Gestionar Suscripción</Button>
                    </Col></>;
            case SubscriptionStatus.TO_BE_CANCELLED:
                return <><Col md={4} sm={12} lg={6} className='mt-2 mt-sm-2'>
                    <Button variant="primary" onClick={handleGetSubscriptionPanel}>Ver Facturas</Button>
                </Col>
                    <Col md={4} sm={12} lg={6} className='mt-2 mt-sm-2'>
                        <Button variant="success" onClick={handleReactivateSubscription}>Reactivar</Button>
                    </Col></>;
            default:
                return "Desconocido";
        }
    }


    return (
        <Row className='justify-content-center align-items-center d-flex'>
            <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                <span>{statusToString()}</span>
            </Col>
            <Col md={4} sm={12} lg={4} className='mt-sm-2'>
                {subscription &&
                    <span>Fecha de renovacion: {formatEndDate()}</span>
                }
            </Col>
            <Col md={4} sm={12} lg={4}>
                <Row className='justify-content-center align-items-center d-flex'>
                    {getSubscriptionButtons()}
                </Row>
            </Col>
        </Row>
    );
}