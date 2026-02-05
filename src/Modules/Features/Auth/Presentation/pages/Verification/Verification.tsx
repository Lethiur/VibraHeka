import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import VerifyUserUseCaseImpl from "@auth/Application/UseCases/VerifyUser/VerifyUserUseCaseImpl";
import useVerifyUser from "@auth/Presentation/Hooks/useVerifyUser";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { VerificationData } from "@auth/Domain/Models/VerificationData";
import { ValidationErrors } from "fluentvalidation-ts";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { Result } from "neverthrow";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/infrastructure/Storage/StorageKeys";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import useResendVerificationCode from "../../Hooks/useResendVerificationCode";


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
                navigate('/login')
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

    async function handleResendVerificationCode() {
        await ResendVerificationCode(localStorage.getString(STORAGE_KEYS.EMAIL) || "");
    }

    return (
        <div>
            <h1>{t('pages.verification.title')}</h1>
            <p>{t('pages.verification.description')}</p>
            <div className="container-fluid justify-content-center">
                <div>
                    {globalError && (<div className="alert alert-danger" role="alert">{globalError}</div>)}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="verificationCode"
                                className="form-label">{t('pages.verification.form.code_label')}</label>
                            <input type="text" className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                                id="verificationCode" name="verificationCode"
                                aria-describedby="verificationCodeHelp" />
                            {
                                errors.code && (
                                    <div className="invalid-feedback" role="alert">{t(`errors.auth.${errors.code}`)}</div>)
                            }
                            <div id="verificationCodeHelp"
                                className="form-text">{t('pages.verification.form.code_help')}</div>
                        </div>
                        <div className="mb-3">
                            <PrimaryButton
                                label={t('pages.verification.form.resend_button')}
                                type="button"
                                variant="secondary"
                                onClick={handleResendVerificationCode}
                                disabled={isSubmitting || loading}
                                fullWidth={false}
                            />
                        </div>


                        <PrimaryButton
                            label={isSubmitting ? t('pages.verification.form.submitting_button') : t('pages.verification.form.submit_button')}
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting || loading}
                            fullWidth={true}
                        />
                    </form>
                </div>

            </div>
        </div>
    )
}