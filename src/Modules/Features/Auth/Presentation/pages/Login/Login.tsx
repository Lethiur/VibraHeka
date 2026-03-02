import React, { useState } from "react";
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
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";


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
        <AuthLayout title={t('pages.login.title')} subtitle={t('pages.login.description')}>
            {globalError && (
                <ErrorBox message={globalError} variant="danger" />
            )}

            <form onSubmit={handleSubmit} noValidate>
                <PrimaryTextInput
                    label={t('pages.login.form.email_label')}
                    name="email"
                    type="email"
                    disabled={isSubmitting}
                    helpText={t('pages.login.form.email_help')}
                    error={errors.email ? t(`errors.auth.${errors.email}`) : undefined}
                />
                <PrimaryTextInput
                    label={t('pages.login.form.password_label')}
                    name="password"
                    type="password"
                    showPasswordToggle={true}
                    disabled={isSubmitting}
                    helpText={t('pages.login.form.password_help')}
                    error={errors.password ? t(`errors.auth.${errors.password}`) : undefined}
                />

                <div className="d-flex justify-content-end mt-2">
                    <Link to="/forgot-password" className="type-body text-decoration-none">
                        {t('pages.login.form.forgot_password_link')}
                    </Link>
                </div>

                <div className="auth-form__submit">
                    <PrimaryButton
                        label={isSubmitting ? t('pages.login.form.submitting_button') : t('pages.login.form.submit_button')}
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        fullWidth={true}
                    />
                </div>
            </form>
        </AuthLayout>
    )
}
