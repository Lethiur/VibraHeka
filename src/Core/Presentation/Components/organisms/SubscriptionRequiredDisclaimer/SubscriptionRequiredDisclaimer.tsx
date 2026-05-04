import React, { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import DisclaimerCard from "@core/Presentation/Components/organisms/DisclaimerCard/DisclaimerCard";
import UseSubscribe from "@users/Presentation/Hooks/UseSubscribe";

interface SubscriptionRequiredDisclaimerProps {
    className?: string;
    footer?: ReactNode;
    children?: ReactNode;
}

function SubscriptionRequiredDisclaimer({ className, footer, children }: SubscriptionRequiredDisclaimerProps) {
    const { t } = useTranslation();
    const { checkoutURL, loading: subscribeLoading, subscribe } = UseSubscribe();

    useEffect(() => {
        if (checkoutURL) {
            window.open(checkoutURL, "_self");
        }
    }, [checkoutURL]);

    const text = (
        <>
            {t("components.disclaimers.subscription_required.text_before")}
            <strong>{t("components.disclaimers.subscription_required.text_highlight")}</strong>
            {t("components.disclaimers.subscription_required.text_after")}
        </>
    );

    const ctas = (
        <Row className="justify-content-center g-2 mt-3">
            <Col xs={12} md={6}>
                <PrimaryButton
                    label={subscribeLoading
                        ? t("components.disclaimers.subscription_required.cta_subscribe_loading")
                        : t("components.disclaimers.subscription_required.cta_subscribe")
                    }
                    variant="primary"
                    onClick={subscribe}
                    disabled={subscribeLoading}
                    fullWidth
                />
            </Col>
            <Col xs={12} md={6}>
                <PrimaryButton
                    label={t("components.disclaimers.subscription_required.cta_whats_included")}
                    variant="secondary"
                    to="/subscripcion"
                    fullWidth
                />
            </Col>
        </Row>
    );

    const defaultFooter = (
        <DisclaimerCard.Footer>
            <span>{t("components.disclaimers.subscription_required.footer_note")}</span>
        </DisclaimerCard.Footer>
    );

    const footerFromChildren = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === DisclaimerCard.Footer
    ) as React.ReactElement | undefined;

    return (
        <DisclaimerCard
            title={t("components.disclaimers.subscription_required.title")}
            text={text}
            ctas={ctas}
            footer={footerFromChildren ?? footer ?? defaultFooter}
            className={className}
        />
    );
}

SubscriptionRequiredDisclaimer.Footer = DisclaimerCard.Footer;

export default SubscriptionRequiredDisclaimer;
