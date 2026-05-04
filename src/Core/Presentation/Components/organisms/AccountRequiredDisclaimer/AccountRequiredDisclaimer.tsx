import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import DisclaimerCard from "@core/Presentation/Components/organisms/DisclaimerCard/DisclaimerCard";

interface AccountRequiredDisclaimerProps {
    className?: string;
    footer?: ReactNode;
    children?: ReactNode;
}

function AccountRequiredDisclaimer({ className, footer, children }: AccountRequiredDisclaimerProps) {
    const { t } = useTranslation();

    const ctas = (
        <Row className="justify-content-center g-2 mt-3">
            <Col xs={12} md={6}>
                <PrimaryButton
                    label={t("components.disclaimers.account_required.cta_register")}
                    variant="primary"
                    to="/registro"
                    fullWidth
                />
            </Col>
            <Col xs={12} md={6}>
                <PrimaryButton
                    label={t("components.disclaimers.account_required.cta_login")}
                    variant="secondary"
                    to="/login"
                    fullWidth
                />
            </Col>
        </Row>
    );

    const footerFromChildren = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === DisclaimerCard.Footer
    ) as React.ReactElement | undefined;

    return (
        <DisclaimerCard
            title={t("components.disclaimers.account_required.title")}
            text={t("components.disclaimers.account_required.text")}
            ctas={ctas}
            footer={footerFromChildren ?? footer}
            className={className}
        />
    );
}

AccountRequiredDisclaimer.Footer = DisclaimerCard.Footer;

export default AccountRequiredDisclaimer;

