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

    // Verificar si el periodo de suscripción se ha cerrado (4 de mayo)
    const isSubscriptionClosed = false; //new Date().getTime() > new Date("2026-05-04T18:00:00Z").getTime();


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
            case SubscriptionStatus.TRIALING:
                return "En periodo de prueba";
            case SubscriptionStatus.CREATED:
                return "A la espera de confirmacion de pago";
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
            case SubscriptionStatus.CREATED:
            case SubscriptionStatus.TO_BE_CANCELLED:
            case SubscriptionStatus.TRIALING:
                return "is-pending";
            case SubscriptionStatus.CANCELLED:
                return "is-cancelled";

            default:
                return "is-neutral";
        }
    };

    const getDateFieldName = () => {
        if (!subscription) return "Sin fecha de renovacion";
        if (subscription.Status === OrderStatus.PENDING) return "Fecha de pago";
        switch (subscription.SubscriptionStatus) {
            case SubscriptionStatus.ACTIVE:
                return "Fecha de renovacion";
            case SubscriptionStatus.TO_BE_CANCELLED:
                return "Fecha de cancelacion";
            case SubscriptionStatus.CANCELLED:
                return "Fecha de cancelacion";
            case SubscriptionStatus.TRIALING:
                return "Fecha primera factura";
            default:
        }
    }

    const formatEndDate = () => {
        if (!subscription?.EndDate) return "Sin fecha de renovacion";
        const formatter = new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone,
        });

        if (subscription.SubscriptionStatus === SubscriptionStatus.TRIALING || subscription.Status === OrderStatus.ORDER_DELAYED) {

            return formatter.format(new Date(subscription.StartDate));
        }

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
            subscription?.Status === OrderStatus.ENABLED_FOR_RETRY &&
            !!subscription.CheckoutSessionUrl;

        if (subscription?.Status === OrderStatus.ENABLED_FOR_RETRY || subscription?.Status === OrderStatus.PENDING) {
            return (
                <Col md={12}>
                    {!isSubscriptionClosed ? (
                        <PrimaryButton
                            label={subscription?.Status === OrderStatus.ENABLED_FOR_RETRY ? "Reanudar pago" : "Procesando tu pago..."}
                            variant="success"
                            fullWidth={true}
                            disabled={!canResumeCheckout}
                            onClick={() => {
                                if (!canResumeCheckout) return;
                                window.open(subscription.CheckoutSessionUrl as string, "_self");
                            }}
                        />
                    ) : (
                        <div className="text-center p-3 bg-light rounded">
                            <p className="text-muted mb-0 small">El periodo de suscripción ha finalizado.</p>
                        </div>
                    )}
                </Col>
            );
        }

        if (!subscription || subscription.SubscriptionStatus === SubscriptionStatus.CANCELLED) {
            return (
                <Col md={12}>
                    {!isSubscriptionClosed ? (
                        <PrimaryButton label="Suscribirme" variant="primary" fullWidth={true} onClick={handleSubscribe} />
                    ) : (
                        <div className="text-center p-3 bg-light rounded">
                            <p className="text-muted mb-0 small">El periodo de suscripción ha finalizado.</p>
                        </div>
                    )}

                    {subscription?.SubscriptionStatus === SubscriptionStatus.CANCELLED && (
                        <div className="mt-3">
                            <PrimaryButton label="Ver facturas" variant="outline-secondary" fullWidth={true}
                                onClick={handleGetSubscriptionPanel} />
                        </div>
                    )}
                </Col>
            );
        }

        if (subscription.SubscriptionStatus === SubscriptionStatus.ACTIVE || subscription.SubscriptionStatus === SubscriptionStatus.TRIALING) {
            return (
                <>
                    <Col md={4} sm={12}>
                        <PrimaryButton label="Cancelar suscripcion" variant="danger-outline" fullWidth={true}
                            onClick={handleCancelSubscription} />
                    </Col>
                    <Col md={4} sm={12}>
                        <PrimaryButton label="Ver facturas" variant="outline" fullWidth={true}
                            onClick={handleGetSubscriptionPanel} />
                    </Col>
                    <Col md={4} sm={12}>
                        <PrimaryButton label="Gestionar suscripcion" variant="outline-primary" fullWidth={true}
                            onClick={handleGetSubscriptionPanel} />
                    </Col>
                </>
            );
        }

        if (subscription.SubscriptionStatus === SubscriptionStatus.TO_BE_CANCELLED) {
            return (
                <>
                    <Col md={6} sm={12}>
                        <PrimaryButton label="Ver facturas" variant="outline-secondary" fullWidth={true}
                            onClick={handleGetSubscriptionPanel} />
                    </Col>
                    <Col md={6} sm={12}>
                        <PrimaryButton label="Reactivar" variant="secondary" fullWidth={true}
                            onClick={handleReactivateSubscription} />
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
                {(subscription?.Status !== OrderStatus.PENDING && subscription?.Status !== OrderStatus.ENABLED_FOR_RETRY) && (
                    <Col md={6} sm={12}>
                        <div className="subscription-kpi">
                            <span className="subscription-kpi__label">{getDateFieldName()}</span>
                            <span className="subscription-kpi__value">{formatEndDate()}</span>
                        </div>
                    </Col>
                )}
                {(subscription?.Status === OrderStatus.PENDING || subscription?.Status === OrderStatus.ENABLED_FOR_RETRY) && (
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
