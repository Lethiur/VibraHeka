import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import CooldownButton from "@core/Presentation/Components/molecules/CooldownButton/CooldownButton";
import useResendVerificationCode from "@auth/Presentation/Hooks/useResendVerificationCode";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox.tsx";

/**
 * The InactiveAccount component renders a user interface for accounts that are marked as inactive. It provides users with the option to resend a verification code and navigate back to the login page.
 *
 * @return {JSX.Element} A React component that includes options for resending the verification code, displaying error messages, and navigating to the login page.
 */
export default function InactiveAccount(): JSX.Element {

    // Hooks
    const { t } = useTranslation();
    const { HandleResendVerificationCode, loading, error } = useResendVerificationCode();

    return (
        <AuthLayout
            title={t('pages.cuenta_inactiva.title')}
            subtitle={t('pages.cuenta_inactiva.description')}
        >
            <ErrorBox message={error} />
            <Row className="g-3 mt-4">
                <Col xs={12} className="text-center">
                    <p className="type-body text-muted mb-3">{t('pages.cuenta_inactiva.resend_hint')}</p>
                    <CooldownButton
                        label={t('pages.cuenta_inactiva.resend_button')}
                        type="button"
                        variant="primary"
                        trackId="reenviar-codigo-verificacion"
                        cooldownSeconds={60}
                        cooldownStorageKey={STORAGE_KEYS.RESEND_VERIFICATION_CODE_COOLDOWN_UNTIL}
                        action={HandleResendVerificationCode}
                        disabled={loading}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={12} className="text-center">
                    <Link to="/login" className="type-body text-decoration-none">
                        {t('pages.cuenta_inactiva.back_to_login')}
                    </Link>
                </Col>
            </Row>
        </AuthLayout>
    );
}
