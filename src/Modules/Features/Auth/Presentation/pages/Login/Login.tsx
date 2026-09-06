import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import useLoginUser from "@auth/Presentation/Hooks/useLoginUser";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes";
import {useSetAtom} from "jotai";
import {isAuthenticatedAtom} from "@core/Presentation/Storage/AuthAtom";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import ReactGA from "react-ga4";


export default function Login() {
    const {t} = useTranslation();
    const localStorage: LocalStorageService = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();
    const {loading, error, success, formErrors, loginUser} = useLoginUser();
    const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

    function trackUser(id: string, email: string) {
        ReactGA.set({
            user_id: id,
            email: email
        });
    }


    useEffect(() => {
        if (error == AuthErrorCodes.USER_NOT_CONFIRMED) {
            localStorage.setString(STORAGE_KEYS.EMAIL, formData.get('email') as string);
            navigate('/cuenta-inactiva');
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            localStorage.remove(STORAGE_KEYS.PASSWORD);
            setIsAuthenticated(true);
            navigate('/actividades');
        }
    }, [success]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        loginUser({
            email: formData.get('email') as string,
            password: formData.get('password') as string
        });

    }

    return (
        <AuthLayout title={t('pages.login.title')} subtitle={t('pages.login.description')}>
            {error && (
                <ErrorBox message={t(`errors.auth.${error}`, {defaultValue: error})} variant="danger"/>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <PrimaryTextInput
                    label={t('pages.login.form.email_label')}
                    name="email"
                    type="email"
                    disabled={loading}
                    helpText={t('pages.login.form.email_help')}
                    error={formErrors.email ? t(`errors.auth.${formErrors.email}`) : undefined}
                />
                <PrimaryTextInput
                    label={t('pages.login.form.password_label')}
                    name="password"
                    type="password"
                    showPasswordToggle={true}
                    disabled={loading}
                    helpText={t('pages.login.form.password_help')}
                    error={formErrors.password ? t(`errors.auth.${formErrors.password}`) : undefined}
                />

                <div className="d-flex justify-content-end mt-2">
                    <Link to="/forgot-password" className="type-body text-decoration-none">
                        {t('pages.login.form.forgot_password_link')}
                    </Link>
                </div>

                <div className="auth-form__submit">
                    <PrimaryButton
                        label={loading ? t('pages.login.form.submitting_button') : t('pages.login.form.submit_button')}
                        type="submit"
                        trackId="submit_login_form"
                        variant="primary"
                        disabled={loading}
                        fullWidth={true}
                    />
                </div>
            </form>
        </AuthLayout>
    )
}


