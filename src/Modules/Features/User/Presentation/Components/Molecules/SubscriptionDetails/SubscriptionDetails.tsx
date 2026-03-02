import { SubscriptionStatus } from "@/Modules/Features/User/Domain/Enums/SubscriptionStatus";
import { OrderStatus } from "@/Modules/Features/User/Domain/Enums/OrderStatus";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { Col, Row } from "react-bootstrap";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
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
        if (subscription.Status === OrderStatus.PENDING) return "Pendiente de pago";
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
        if (subscription.Status === OrderStatus.PENDING) return "is-pending";
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

    const formatCheckoutExpiration = () => {
        if (!subscription?.CheckoutSessionExpiresAt) return "Sin fecha de expiracion";
        const formatter = new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone,
        });
        return formatter.format(new Date(subscription.CheckoutSessionExpiresAt));
    };

    const renderActionButtons = () => {
        const canResumeCheckout =
            subscription?.Status === OrderStatus.PENDING &&
            !!subscription.CheckoutSessionUrl;

        if (canResumeCheckout) {
            return (
                <Col md={12}>
                    <PrimaryButton
                        label="Reanudar pago"
                        variant="success"
                        fullWidth={true}
                        onClick={() => window.open(subscription.CheckoutSessionUrl as string, "_self")}
                    />
                </Col>
            );
        }

        if (!subscription || subscription.SubscriptionStatus === SubscriptionStatus.CANCELLED) {
            return (
                <Col md={12}>
                    <PrimaryButton label="Suscribirme" variant="primary" fullWidth={true} onClick={handleSubscribe} />
                    {subscription?.SubscriptionStatus === SubscriptionStatus.CANCELLED && (
                        <div className="mt-3">
                            <PrimaryButton label="Ver facturas" variant="outline-secondary" fullWidth={true} onClick={handleGetSubscriptionPanel} />
                        </div>
                    )}
                </Col>
            );
        }

        if (subscription.SubscriptionStatus === SubscriptionStatus.ACTIVE) {
            return (
                <>
                    <Col md={4} sm={12}>
                        <PrimaryButton label="Cancelar suscripcion" variant="danger-outline" fullWidth={true} onClick={handleCancelSubscription} />
                    </Col>
                    <Col md={4} sm={12}>
                        <PrimaryButton label="Ver facturas" variant="outline" fullWidth={true} onClick={handleGetSubscriptionPanel} />
                    </Col>
                    <Col md={4} sm={12}>
                        <PrimaryButton label="Gestionar suscripcion" variant="outline-primary" fullWidth={true} onClick={handleGetSubscriptionPanel} />
                    </Col>
                </>
            );
        }

        if (subscription.SubscriptionStatus === SubscriptionStatus.TO_BE_CANCELLED) {
            return (
                <>
                    <Col md={6} sm={12}>
                        <PrimaryButton label="Ver facturas" variant="outline-secondary" fullWidth={true} onClick={handleGetSubscriptionPanel} />
                    </Col>
                    <Col md={6} sm={12}>
                        <PrimaryButton label="Reactivar" variant="secondary" fullWidth={true} onClick={handleReactivateSubscription} />
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
                {subscription?.Status === OrderStatus.PENDING && (
                    <Col md={12} sm={12}>
                        <div className="subscription-note">
                            Tu sesion de pago sigue activa hasta el {formatCheckoutExpiration()}.
                        </div>
                    </Col>
                )}
            </Row>
            <Row className="g-3 subscription-details__actions">
                {renderActionButtons()}
            </Row>
        </div>
    );
}
