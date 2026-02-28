import React, { useState } from "react";
import "./Login.scss";
import { useTranslation } from "react-i18next";
import { LoginData } from "@auth/Domain/Models/LoginData";
import { ValidationErrors } from "fluentvalidation-ts";
import useLoginUser from "@auth/Presentation/Hooks/useLoginUser";
import LoginUserUseCase from "@auth/Application/UseCases/LoginUser/LoginUserUseCase";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { LoginResult } from "@auth/Domain/Models/LoginResult";
import { Result } from "neverthrow";
import { useSetAtom } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";


export default function Login() {

    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors<LoginData>>({})
    const { t } = useTranslation();
    const localStorage: LocalStorageService = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();
    const loginUserUseCase: LoginUserUseCase = useLoginUser();
    const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setGlobalError(null);
        const formData = new FormData(event.currentTarget);

        try {
            setIsSubmitting(true);
            const authResult: Result<LoginResult, AuthErrorCodes> = await loginUserUseCase.execute({
                email: formData.get('email') as string,
                password: formData.get('password') as string
            });

            if (authResult.isOk()) {
                setIsAuthenticated(true);
            } else {
                if (authResult.error == AuthErrorCodes.USER_NOT_CONFIRMED) {
                    localStorage.setString(STORAGE_KEYS.EMAIL, formData.get('email') as string);
                    navigate('/verify');
                }
                setGlobalError(authResult.error);
            }

        } catch (error) {
            if (error instanceof InvalidEntityError) {
                setErrors(error.fieldErrors);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="login-page">
            <div className="auth-card">
                <div className="auth-card__head">
                    <h1>{t('pages.login.title')}</h1>
                    <p>{t('pages.login.description')}</p>
                </div>
                {globalError && (
                    <ErrorBox message={globalError} variant="danger" />
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className='auth-card__field'>
                        <label htmlFor="email">{t('pages.login.form.email_label')}</label>
                        <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" id="email" aria-describedby="emailHelp" />
                        <span id="emailHelp" className="form-text">{t('pages.login.form.email_help')}</span>
                        {errors.email && <span className="invalid-feedback">{t(`errors.auth.${errors.email}`)}</span>}
                    </div>

                    <div className='auth-card__field'>
                        <label htmlFor="password">{t('pages.login.form.password_label')}</label>
                        <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" />
                        <span id="passwordHelp" className="form-text">{t('pages.login.form.password_help')}</span>
                        {errors.password && <span className="invalid-feedback">{t(`errors.auth.${errors.password}`)}</span>}
                    </div>

                    <div className="auth-card__submit">
                        <PrimaryButton
                            label={isSubmitting ? t('pages.login.form.submitting_button') : t('pages.login.form.submit_button')}
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            fullWidth={true}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}