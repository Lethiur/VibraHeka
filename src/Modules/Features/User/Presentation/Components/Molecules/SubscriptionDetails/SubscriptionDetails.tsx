import { useTranslation } from "react-i18next";
import { SubscriptionStatus } from "@/Modules/Features/User/Domain/Enums/SubscriptionStatus";
import { OrderStatus } from "@/Modules/Features/User/Domain/Enums/OrderStatus";
import Subscription from "@users/Domain/Entities/Subscription";
import { Col, Row } from "react-bootstrap";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import "./SubscriptionDetails.scss";

interface SubscriptionDetailsProps {
    subscription: Subscription | null;
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
    const { t } = useTranslation();

    const isPaymentPending = subscription?.isPaymentPending() ?? false;
    const isActive = subscription?.isActive() ?? false;
    const isSubscriptionClosed = false;

    const getStatusText = () => {
        if (!subscription) return t("pages.profile.subscription.statuses.no_subscription");
        if (isPaymentPending) return t("pages.profile.subscription.statuses.pending_payment");
        switch (subscription.SubscriptionStatus) {
            case SubscriptionStatus.ACTIVE:
                return t("pages.profile.subscription.statuses.active");
            case SubscriptionStatus.TO_BE_CANCELLED:
                return t("pages.profile.subscription.statuses.pending_cancel");
            case SubscriptionStatus.CANCELLED:
                return t("pages.profile.subscription.statuses.cancelled");
            case SubscriptionStatus.TRIALING:
                return t("pages.profile.subscription.statuses.trialing");
            case SubscriptionStatus.CREATED:
                return t("pages.profile.subscription.statuses.created");
            default:
                return t("pages.profile.subscription.statuses.unknown");
        }
    };

    const getStatusClass = () => {
        if (!subscription) return "is-neutral";
        if (isPaymentPending) return "is-pending";
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
        if (!subscription) return t("pages.profile.subscription.date_labels.no_renewal");
        if (isPaymentPending) return t("pages.profile.subscription.date_labels.payment");
        switch (subscription.SubscriptionStatus) {
            case SubscriptionStatus.ACTIVE:
                return t("pages.profile.subscription.date_labels.renewal");
            case SubscriptionStatus.TO_BE_CANCELLED:
                return t("pages.profile.subscription.date_labels.cancelation");
            case SubscriptionStatus.CANCELLED:
                return t("pages.profile.subscription.date_labels.cancelation");
            case SubscriptionStatus.TRIALING:
                return t("pages.profile.subscription.date_labels.first_invoice");
            default:
                return t("pages.profile.subscription.date_labels.no_renewal");
        }
    }

    const formatEndDate = () => {
        if (!subscription?.EndDate) return t("pages.profile.subscription.date_labels.no_renewal");
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
        if (!subscription?.CheckoutSessionExpiresAt) return t("pages.profile.subscription.date_labels.no_expiration");
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
        const canResumeCheckout = subscription?.canResumePayment() ?? false;

        if (isPaymentPending || canResumeCheckout) {
            return (
                <Col md={12}>
                    {!isSubscriptionClosed ? (
                        <PrimaryButton
                            label={canResumeCheckout
                                ? t("pages.profile.subscription.actions.resume_payment")
                                : t("pages.profile.subscription.actions.processing_payment")}
                            variant="success"
                            fullWidth={true}
                            disabled={!canResumeCheckout}
                            onClick={() => {
                                if (!canResumeCheckout) return;
                                window.open(subscription!.CheckoutSessionUrl!, "_self");
                            }}
                        />
                    ) : (
                        <div className="text-center p-3 bg-light rounded">
                            <p className="text-muted mb-0 small">{t("pages.profile.subscription.actions.period_closed")}</p>
                        </div>
                    )}
                </Col>
            );
        }

        if (!subscription || subscription.SubscriptionStatus === SubscriptionStatus.CANCELLED) {
            return (
                <Col md={12}>
                    {!isSubscriptionClosed ? (
                        <PrimaryButton label={t("pages.profile.subscription.actions.subscribe")} variant="primary" fullWidth={true} onClick={handleSubscribe} />
                    ) : (
                        <div className="text-center p-3 bg-light rounded">
                            <p className="text-muted mb-0 small">{t("pages.profile.subscription.actions.period_closed")}</p>
                        </div>
                    )}

                    {subscription?.SubscriptionStatus === SubscriptionStatus.CANCELLED && (
                        <div className="mt-3">
                            <PrimaryButton label={t("pages.profile.subscription.actions.view_invoices")} variant="outline-secondary" fullWidth={true}
                                onClick={handleGetSubscriptionPanel} />
                        </div>
                    )}
                </Col>
            );
        }

        if (isActive) {
            return (
                <>
                    <Col md={4} sm={12}>
                        <PrimaryButton label={t("pages.profile.subscription.actions.cancel")} variant="danger-outline" fullWidth={true}
                            onClick={handleCancelSubscription} />
                    </Col>
                    <Col md={4} sm={12}>
                        <PrimaryButton label={t("pages.profile.subscription.actions.view_invoices")} variant="outline" fullWidth={true}
                            onClick={handleGetSubscriptionPanel} />
                    </Col>
                    <Col md={4} sm={12}>
                        <PrimaryButton label={t("pages.profile.subscription.actions.manage")} variant="outline-primary" fullWidth={true}
                            onClick={handleGetSubscriptionPanel} />
                    </Col>
                </>
            );
        }

        if (subscription.SubscriptionStatus === SubscriptionStatus.TO_BE_CANCELLED) {
            return (
                <>
                    <Col md={6} sm={12}>
                        <PrimaryButton label={t("pages.profile.subscription.actions.view_invoices")} variant="outline-secondary" fullWidth={true}
                            onClick={handleGetSubscriptionPanel} />
                    </Col>
                    <Col md={6} sm={12}>
                        <PrimaryButton label={t("pages.profile.subscription.actions.reactivate")} variant="secondary" fullWidth={true}
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
                        <span className="subscription-kpi__label">{t("pages.profile.subscription.status_label")}</span>
                        <span className={`subscription-kpi__value ${getStatusClass()}`}>{getStatusText()}</span>
                    </div>
                </Col>
                {!isPaymentPending && (
                    <Col md={6} sm={12}>
                        <div className="subscription-kpi">
                            <span className="subscription-kpi__label">{getDateFieldName()}</span>
                            <span className="subscription-kpi__value">{formatEndDate()}</span>
                        </div>
                    </Col>
                )}
                {isPaymentPending && (
                    <Col md={12} sm={12}>
                        <div className="subscription-note">
                            {t("pages.profile.subscription.payment_session_active_until", { date: formatCheckoutExpiration() })}
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
