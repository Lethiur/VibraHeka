import React, { useEffect, useState } from "react";
import "./Verification.scss";
import { useTranslation } from "react-i18next";
import VerifyUserUseCaseImpl from "@auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl";
import useVerifyUser from "@auth/Presentation/Hooks/useVerifyUser";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { VerificationData } from "@auth/Domain/Models/VerificationData";
import { ValidationErrors } from "fluentvalidation-ts";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { Result } from "neverthrow";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import useResendVerificationCode from "../../Hooks/useResendVerificationCode";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import { Row, Col } from "react-bootstrap";
import CooldownButton from "@core/Presentation/Components/molecules/CooldownButton/CooldownButton";


export default function Verification() {

    const { t } = useTranslation();
    const [errors, setErrors] = useState<ValidationErrors<VerificationData>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { ResendVerificationCode, loading } = useResendVerificationCode();
    const verifyUserUseCase: VerifyUserUseCaseImpl = useVerifyUser();
    const localStorage: LocalStorageService = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const email: string | null = localStorage.getString(STORAGE_KEYS.EMAIL);
        if (email == null || email === '') {
            navigate('/')
        }
    }, []);

    /**
     * 
     * @param event 
     */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            setIsSubmitting(true);
            let verificationResult: Result<void, AuthErrorCodes> = await verifyUserUseCase.Execute({
                code: formData.get('verificationCode') as string,
                email: localStorage.getString(STORAGE_KEYS.EMAIL) || ""
            });

            if (verificationResult.isOk()) {
                navigate('/profile/me')
            } else {
                setGlobalError(t(`errors.auth.${verificationResult.error}`))
            }

        } catch (error) {
            if (error instanceof InvalidEntityError) {
                setErrors(error.fieldErrors);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout title={t('pages.verification.title')} subtitle={t('pages.verification.description')}>
            <ErrorBox message={globalError} variant="danger" />

            <form onSubmit={handleSubmit} noValidate>
                <PrimaryTextInput
                    label={t('pages.verification.form.code_label')}
                    name="verificationCode"
                    disabled={isSubmitting || loading}
                    helpText={t('pages.verification.form.code_help')}
                    error={errors.code ? t(`errors.auth.${errors.code}`) : undefined}
                />

                <Row className="g-3 verification-actions">
                    <Col xs={12} md={6}>
                        <CooldownButton
                            label={
                                <>
                                    {t('pages.verification.form.resend_button')}
                                </>
                            }
                            type="button"
                            variant="secondary"
                            cooldownSeconds={60}
                            cooldownStorageKey={STORAGE_KEYS.RESEND_VERIFICATION_CODE_COOLDOWN_UNTIL}
                            action={async () => {
                                const result = await ResendVerificationCode(localStorage.getString(STORAGE_KEYS.EMAIL) || "");
                                return result.isOk();
                            }}
                            disabled={isSubmitting || loading}
                            fullWidth={true}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <PrimaryButton
                            label={isSubmitting ? t('pages.verification.form.submitting_button') : t('pages.verification.form.submit_button')}
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting || loading}
                            fullWidth={true}
                        />
                    </Col>
                </Row>
            </form>
        </AuthLayout>
    )
}
