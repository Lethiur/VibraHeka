import React, { useState } from "react";
import { ValidationErrors } from "fluentvalidation-ts";
import PrimaryButton from "../../../../../components/atoms/PrimaryButton/PrimaryButton";
import { useTranslation } from "react-i18next";
import {RegistrationData} from "../../../Domain/Models/RegistrationData.ts";
import {useRegisterUser} from "../../Hooks/useRegisterUser.ts";
import RegisterUserUseCase from "../../../Application/UseCases/RegisterUser/RegisterUserUseCase.ts";
import {AuthErrorCodes} from "../../../Domain/Errors/AuthErrorCodes.ts";
import {RegistrationResult} from "../../../Domain/Models/RegistrationResult.ts";
import {Result} from "neverthrow";
import InvalidEntityError from "../../../Application/Errors/InvalidEntityError.ts";
import useLocalStorage from "../../../../../core/Presentation/Hooks/UseLocalStorage.ts";
import LocalStorageService from "../../../../../core/Infrastructure/Storage/LocalStorageService.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {STORAGE_KEYS} from "../../../../../core/Infrastructure/Storage/StorageKeys.ts";

export default function Registro() {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<ValidationErrors<RegistrationData>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const registerUserUseCase : RegisterUserUseCase = useRegisterUser();
    const localStorage : LocalStorageService = useLocalStorage();
    const naviagate : NavigateFunction = useNavigate();
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setGlobalError(null);

        const formData = new FormData(event.currentTarget);

        const data: RegistrationData = {
            fullName: (formData.get('name') as string) || "",
            email: (formData.get('email') as string) || "",
            password: (formData.get('password') as string) || ""
        };

        
        try {
            setIsSubmitting(true);
            const result : Result<RegistrationResult, AuthErrorCodes> = await registerUserUseCase.execute(data);
            if (result.isOk()) {
                localStorage.setString(STORAGE_KEYS.EMAIL, data.email);
                naviagate('/verify');
            } else {
                setGlobalError(t(`errors.auth.${result.error}`));
            }

        } catch (error) {
            if (error instanceof InvalidEntityError) {
                setErrors(error.fieldErrors);
            }
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <h1>{t('pages.register.title')}</h1>
            <p>{t('pages.register.description')}</p>
            <div className="container-fluid justify-content-center">
                <div>
                    {globalError && (
                        <div className="alert alert-danger" role="alert">
                            {globalError}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">{t('pages.register.form.name_label')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.fullName && <div className="invalid-feedback">{t('pages.register.validation.name_required')}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">{t('pages.register.form.email_label')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.email && <div className="invalid-feedback">{t('pages.register.validation.email_invalid')}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">{t('pages.register.form.password_label')}</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.password && <div className="invalid-feedback">{t('pages.register.validation.password_length')}</div>}
                        </div>
                        <PrimaryButton
                            label={isSubmitting ? t('pages.register.form.submitting_button') : t('pages.register.form.submit_button')}
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