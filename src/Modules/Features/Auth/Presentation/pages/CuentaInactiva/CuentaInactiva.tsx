import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import CooldownButton from "@core/Presentation/Components/molecules/CooldownButton/CooldownButton";
import useResendVerificationCode from "@auth/Presentation/Hooks/useResendVerificationCode";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";

export default function CuentaInactiva() {
    const { t } = useTranslation();
    const { ResendVerificationCode, loading } = useResendVerificationCode();
    const localStorage: LocalStorageService = useLocalStorage();

    return (
        <AuthLayout
            title={t('pages.cuenta_inactiva.title')}
            subtitle={t('pages.cuenta_inactiva.description')}
        >
            <Row className="g-3 mt-4">
                <Col xs={12} className="text-center">
                    <p className="type-body text-muted mb-3">{t('pages.cuenta_inactiva.resend_hint')}</p>
                    <CooldownButton
                        label={t('pages.cuenta_inactiva.resend_button')}
                        type="button"
                        variant="primary"
                        cooldownSeconds={60}
                        cooldownStorageKey={STORAGE_KEYS.RESEND_VERIFICATION_CODE_COOLDOWN_UNTIL}
                        action={async () => {
                            const result = await ResendVerificationCode(
                                localStorage.getString(STORAGE_KEYS.EMAIL) ?? ""
                            );
                            return result.isOk();
                        }}
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
