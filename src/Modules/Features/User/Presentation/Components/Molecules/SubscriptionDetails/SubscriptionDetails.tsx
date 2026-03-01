import { SubscriptionStatus } from "@/Modules/Features/User/Domain/Enums/SubscriptionStatus";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { Button, Col, Row } from "react-bootstrap";
import "./SubscriptionDetails.scss";

interface SubscriptionDetailsProps {
    subscription: ISubscription | null;
    timeZone: string;
    handleSubscribe: () => void;
    handleCancelSubscription: () => void;
    handleGetSubscriptionPanel: () => void;
    handleReactivateSubscription: () => void;
}

export default function SubscriptionDetails({
    subscription,
    timeZone,
    handleSubscribe,
    handleCancelSubscription,
    handleGetSubscriptionPanel,
    handleReactivateSubscription,
}: SubscriptionDetailsProps) {
    const getStatusText = () => {
        if (!subscription) return "Sin suscripcion activa";
        switch (subscription.SubscriptionStatus) {
            case SubscriptionStatus.ACTIVE:
                return "Activa";
            case SubscriptionStatus.TO_BE_CANCELLED:
                return "Pendiente de cancelacion";
            case SubscriptionStatus.CANCELLED:
                return "Cancelada";
            default:
                return "Desconocido";
        }
    };

    const getStatusClass = () => {
        if (!subscription) return "is-neutral";
        switch (subscription.SubscriptionStatus) {
            case SubscriptionStatus.ACTIVE:
                return "is-active";
            case SubscriptionStatus.TO_BE_CANCELLED:
                return "is-pending";
            case SubscriptionStatus.CANCELLED:
                return "is-cancelled";
            default:
                return "is-neutral";
        }
    };

    const formatEndDate = () => {
        if (!subscription?.EndDate) return "Sin fecha de renovacion";
        const formatter = new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone,
        });
        return formatter.format(new Date(subscription.EndDate));
    };

    const renderActionButtons = () => {
        if (!subscription || subscription.SubscriptionStatus === SubscriptionStatus.CANCELLED) {
            return (
                <Col md={12}>
                    <Button className="subscription-action-btn" variant="light" onClick={handleSubscribe}>
                        Suscribirme
                    </Button>
                    {subscription?.SubscriptionStatus === SubscriptionStatus.CANCELLED && (
                        <Button className="subscription-action-btn" variant="light" onClick={handleGetSubscriptionPanel}>
                            Ver facturas
                        </Button>
                    )}
                </Col>
            );
        }

        if (subscription.SubscriptionStatus === SubscriptionStatus.ACTIVE) {
            return (
                <>
                    <Col md={4} sm={12}>
                        <Button className="subscription-action-btn is-danger" variant="light" onClick={handleCancelSubscription}>
                            Cancelar suscripcion
                        </Button>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button className="subscription-action-btn" variant="light" onClick={handleGetSubscriptionPanel}>
                            Ver facturas
                        </Button>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button className="subscription-action-btn" variant="light" onClick={handleGetSubscriptionPanel}>
                            Gestionar suscripcion
                        </Button>
                    </Col>
                </>
            );
        }

        if (subscription.SubscriptionStatus === SubscriptionStatus.TO_BE_CANCELLED) {
            return (
                <>
                    <Col md={6} sm={12}>
                        <Button className="subscription-action-btn" variant="light" onClick={handleGetSubscriptionPanel}>
                            Ver facturas
                        </Button>
                    </Col>
                    <Col md={6} sm={12}>
                        <Button className="subscription-action-btn is-success" variant="light" onClick={handleReactivateSubscription}>
                            Reactivar
                        </Button>
                    </Col>
                </>
            );
        }

        return null;
    };

    return (
        <div className="subscription-details">
            <Row className="g-3 subscription-details__summary">
                <Col md={6} sm={12}>
                    <div className="subscription-kpi">
                        <span className="subscription-kpi__label">Estado</span>
                        <span className={`subscription-kpi__value ${getStatusClass()}`}>{getStatusText()}</span>
                    </div>
                </Col>
                <Col md={6} sm={12}>
                    <div className="subscription-kpi">
                        <span className="subscription-kpi__label">Renovacion</span>
                        <span className="subscription-kpi__value">{formatEndDate()}</span>
                    </div>
                </Col>
            </Row>
            <Row className="g-3 subscription-details__actions">
                {renderActionButtons()}
            </Row>
        </div>
    );
}
