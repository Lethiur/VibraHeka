import React, {useEffect, useState} from "react";
import PrimaryButton from "../../../../../components/atoms/PrimaryButton/PrimaryButton.tsx";
import {useTranslation} from "react-i18next";
import VerifyUserUseCaseImpl from "../../../Application/UseCases/VerifyUser/VerifyUserUseCaseImpl.ts";
import useVerifyUser from "../../Hooks/useVerifyUser.ts";
import useLocalStorage from "../../../../../core/Presentation/Hooks/UseLocalStorage.ts";
import LocalStorageService from "../../../../../core/Infrastructure/Storage/LocalStorageService.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import InvalidEntityError from "../../../Application/Errors/InvalidEntityError.ts";
import {VerificationData} from "../../../Domain/Models/VerificationData.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes.ts";
import {Result} from "neverthrow";
import {STORAGE_KEYS} from "../../../../../core/Infrastructure/Storage/StorageKeys.ts";


export default function Verification() {

    const {t} = useTranslation();
    const [errors, setErrors] = useState<ValidationErrors<VerificationData>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const verifyUserUseCase: VerifyUserUseCaseImpl = useVerifyUser();
    const localStorage: LocalStorageService = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const email: string | null = localStorage.getString(STORAGE_KEYS.EMAIL);
        if (email == null || email === '') {
            navigate('/')
        }
    })

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
                                   aria-describedby="verificationCodeHelp"/>
                            {
                                errors.code && (
                                    <div className="invalid-feedback" role="alert">{t(`errors.auth.${errors.code}`)}</div>)
                            }
                            <div id="verificationCodeHelp"
                                 className="form-text">{t('pages.verification.form.code_help')}</div>
                        </div>
                        <PrimaryButton
                            label={isSubmitting ? t('pages.verification.form.submitting_button') : t('pages.verification.form.submit_button')}
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            fullWidth={true}
                        />
                    </form>
                </div>

            </div>
        </div>
    )
}