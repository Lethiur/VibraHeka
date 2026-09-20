import {Card, Col, Row} from "react-bootstrap";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import {useNavigate} from "react-router-dom";
import "./SubscriptionPanel.scss";
import UseCancelSubscription from "@users/Presentation/Hooks/UseCancelSubscription";
import UseGetSubscription from "@users/Presentation/Hooks/UseGetSubscription";
import UseSubscribe from "@users/Presentation/Hooks/UseSubscribe";
import {useEffect, useState} from "react";
import {SubscriptionErrors} from "@users/Domain/Errors/SubscriptionErrors";
import UseGetSubscriptionPanel from "@users/Presentation/Hooks/UseGetSubscriptionPanel";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import UseRefreshSubscription from "@users/Presentation/Hooks/UseRefreshSubscription";
import SubscriptionDetails
    from "@/Modules/Features/User/Presentation/Components/Molecules/SubscriptionDetails/SubscriptionDetails";
import UseReactivateSubscription from "../../../Hooks/UseReactivateSubscription";
import { useTranslation } from "react-i18next";


interface SubscriptionPanelProps {
    timeZone: string;
}

export default function SubscriptionPanel({timeZone}: SubscriptionPanelProps) {
    const navigate = useNavigate();
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
    const { t } = useTranslation();

    const {checkoutURL, loading, error, subscribe} = UseSubscribe();
    const {
        subscription,
        loading: subscriptionLoading,
        error: subscriptionError,
        getSubscription
    } = UseGetSubscription();
    const {
        cancelSubscription,
        loading: cancelSubscriptionLoading,
        error: cancelSubscriptionError,
        success: cancelSubscriptionSuccess
    } = UseCancelSubscription();
    const {
        getSubscriptionPanel,
        loading: getSubscriptionPanelLoading,
        error: getSubscriptionPanelError,
        subscriptionPanel
    } = UseGetSubscriptionPanel();
    const {
        reactivateSubscription,
        loading: reactivateSubscriptionLoading,
        error: reactivateSubscriptionError
    } = UseReactivateSubscription();

    UseRefreshSubscription(subscription?.isPaymentPending() ?? false);

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

    useEffect(() => {
        if (!cancelSubscriptionSuccess) {
            return;
        }
        getSubscription();
        setShowCancelConfirmation(false);
    }, [cancelSubscriptionSuccess, getSubscription]);

    const handleSubscribe = () => {
        subscribe();
    };

    const handleCancelSubscription = () => {
        setShowCancelConfirmation(true);
    };

    const handleCloseCancelConfirmation = () => {
        if (cancelSubscriptionLoading) return;
        setShowCancelConfirmation(false);
    };

    const handleConfirmCancelSubscription = async () => {
        await cancelSubscription();
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
        <>
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
            {subscription?.isPaymentPending() && (
                <Row className="g-3 justify-content-center align-items-center">
                    <Col md={12} lg={12}>
                        <PrimaryButton label={t("pages.profile.subscription.actions.resume_payment_hint")} variant="primary"
                                       onClick={() => window.open(subscription!.CheckoutSessionUrl!, "_self")}/>
                    </Col>
                </Row>
            )}
        </>
    );

    const renderCardBody = () => {
        if (isInitialLoading || (isLoading())) {
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
        <>
            <Row className="justify-content-center align-items-center mt-2 mt-md-4">
                <Col md={12} lg={12}>
                    <Card className="profile-card vh-panel vh-surface-card">
                        <Card.Header className="subscription-panel__header">
                            <h2>{t("pages.profile.subscription.title")}</h2>
                            <button
                                type="button"
                                className="subscription-panel__benefits-btn"
                                onClick={() => navigate("/subscripcion")}
                            >
                                {t("pages.profile.subscription.whats_included")}
                            </button>
                        </Card.Header>
                        <Card.Body>{renderCardBody()}</Card.Body>
                    </Card>
                </Col>
            </Row>


            <VHModal show={showCancelConfirmation} onHide={handleCloseCancelConfirmation} centered>
                <VHModal.Header closeButton={!cancelSubscriptionLoading}>
                    <VHModal.Title>{t("pages.profile.subscription.cancel_modal.title")}</VHModal.Title>
                </VHModal.Header>
                <VHModal.Body>
                    {t("pages.profile.subscription.cancel_modal.body")}
                </VHModal.Body>
                <VHModal.Footer>
                    <PrimaryButton
                        label={t("pages.profile.subscription.cancel_modal.keep")}
                        variant="outline-secondary"
                        onClick={handleCloseCancelConfirmation}
                        disabled={cancelSubscriptionLoading}
                    />
                    <PrimaryButton
                        label={cancelSubscriptionLoading ? t("pages.profile.subscription.cancel_modal.cancelling") : t("pages.profile.subscription.cancel_modal.confirm")}
                        variant="danger"
                        onClick={handleConfirmCancelSubscription}
                        disabled={cancelSubscriptionLoading}
                    />
                </VHModal.Footer>
            </VHModal>
        </>
    );
}
