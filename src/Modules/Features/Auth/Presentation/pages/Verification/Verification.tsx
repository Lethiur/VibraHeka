import {useEffect} from "react";
import "./Verification.scss";
import {useTranslation} from "react-i18next";
import useVerifyUser from "@auth/Presentation/Hooks/useVerifyUser";
import {NavigateFunction, useNavigate, useSearchParams} from "react-router-dom";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys";
import useResendVerificationCode from "../../Hooks/useResendVerificationCode";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import {Row, Col} from "react-bootstrap";
import CooldownButton from "@core/Presentation/Components/molecules/CooldownButton/CooldownButton";
import useLoginUser from "@auth/Presentation/Hooks/useLoginUser.ts";
import ReactGA from "react-ga4";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";

const verificationInFlightTokens = new Set<string>();


export default function Verification() {

    // Verification token
    const [searchParams] = useSearchParams();
    const verificationToken: string = searchParams.get("token") || "";
    const {t} = useTranslation();

    // Services
    const localStorage: LocalStorageService = useLocalStorage();

    // Hooks
    const {HandleResendVerificationCode, loading: resendingVerificationCode, error: resendingError} = useResendVerificationCode();
    const {loading, verifyUser, error: verificationError} = useVerifyUser();
    const {loading: loginLoading, loginUser, error: loginError} = useLoginUser();
    const navigate: NavigateFunction = useNavigate();

    /**
     *
     */
    useEffect(() => {
        if (!verificationToken) {
            navigate('/login');
            return;
        }
        verifyUserAndLogin();
    }, [verificationToken]);

    // Vars
    const isSubmitting = resendingVerificationCode || loginLoading || loading;

    /**
     * Tracks events for user interactions using Google Analytics via ReactGA.
     * This method logs two specific events: "generate_lead" and "account_verified",
     * with corresponding methods "formulario" and "email_link".
     *
     * @return {void} No return value.
     */
    function trackEvent() : void {
        ReactGA.event("generate_lead", {
            method: "formulario"
        });
        ReactGA.event("account_verified", {
            method: "email_link"
        });
    }

    /**
     * Verifies the user based on the provided verification token and attempts to log in using stored credentials.
     * If the verification or login fails, navigates the user to the login page.
     *
     * @return {Promise<void>} A promise that resolves when the verification and login process is complete,
     *                         or when the navigation to the login page occurs.
     */
    async function verifyUserAndLogin(): Promise<void> {

        if (verificationInFlightTokens.has(verificationToken)) return;
        verificationInFlightTokens.add(verificationToken);

        verifyUser({encryptedCode: verificationToken}, {
            onSuccess: () => {
                trackEvent();
                const pwd: string | null = localStorage.getString(STORAGE_KEYS.PASSWORD);
                const email: string | null = localStorage.getString(STORAGE_KEYS.EMAIL);

                if (!pwd || !email) {
                    navigate('/login');
                    return;
                }

                loginUser({email: email, password: pwd}, {
                    onError: () => {
                        navigate('/login');
                    }, onSettled: () => {
                        verificationInFlightTokens.delete(verificationToken);
                    }
                });
            }
        })
    }



    if (isSubmitting) {
        return <AppLoader message={t('pages.verification.verifying')}/>;
    }

    return (
        <AuthLayout title={t('pages.verification.title')} subtitle={t('pages.verification.description')}>
            <ErrorBox message={verificationError || loginError || resendingError} variant="danger"/>
            <Row className="g-3 verification-actions">
                <Col xs={12} md={6}>
                    {(!isSubmitting || !verificationToken) && (
                        <CooldownButton
                            label={<>{t('pages.verification.form.resend_button')}</>}
                            type="button"
                            variant="secondary"
                            cooldownSeconds={60}
                            cooldownStorageKey={STORAGE_KEYS.RESEND_VERIFICATION_CODE_COOLDOWN_UNTIL}
                            action={HandleResendVerificationCode}
                            disabled={isSubmitting}
                            fullWidth={true}
                        />
                    )}
                </Col>
            </Row>
        </AuthLayout>
    )
}
