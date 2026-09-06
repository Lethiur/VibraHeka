import React, {useState} from "react";

import {useTranslation} from "react-i18next";
import {useRegisterUser} from "@auth/Presentation/Hooks/useRegisterUser";
import {NavigateFunction, useNavigate, Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import PasswordStrengthMeter from "@auth/Presentation/Components/Molecules/PasswordStrengthMeter/PasswordStrengthMeter";
import ReactGA from "react-ga4";
import {RegistrationCommand} from "@auth/Domain/Commands/RegistrationCommand.ts";

/**
 * Renders the user registration form and handles the registration logic.
 *
 * This component uses various hooks and services to manage state, handle form submission,
 * and navigate the user upon successful registration. It provides input fields for user
 * information such as email, username, and password, and displays errors if they occur.
 *
 * The form submission process includes validation, API interaction for user registration,
 * and storing user credentials in local storage. It navigates to a success page upon successful registration.
 *
 * @return {JSX.Element} The rendered registration form component.
 */
export default function Registration(): JSX.Element {

    // State variables
    const [password, setPassword] = useState("");

    // Hooks
    const {t} = useTranslation();
    const {registerUser, error, loading, fromErrors} = useRegisterUser();
    const localStorage: LocalStorageService = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();

    /**
     * Handles the form submission event by preventing the default behavior, extracting form data,
     * and passing the data to a user registration function with appropriate callbacks.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event triggered by the user.
     * @return {Promise<void>} A promise that resolves once the form submission process is complete.
     */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data : RegistrationCommand = {
            firstName: (formData.get('firstName') as string) || "",
            email: (formData.get('email') as string) || "",
            password: password,
            timezone: "Europe/Madrid"
        };


        registerUser(data, {
            onSuccess: () => {
                localStorage.setString(STORAGE_KEYS.EMAIL, data.email);
                localStorage.setString(STORAGE_KEYS.PASSWORD, data.password);
                ReactGA.event("sign_up", {
                    method: "email"
                });
                navigate('/registro-exitoso');
            }
        });
    }

    return (
        <AuthLayout title={t('pages.register.title')} subtitle={t('pages.register.description')}>
            <ErrorBox message={error}/>

            <form onSubmit={handleSubmit} noValidate>
                <div className="auth-form__section">
                    <span className="auth-form__section-label">Acceso</span>
                    <PrimaryTextInput
                        label={t('pages.register.form.email_label')}
                        name="email"
                        type="email"
                        required
                        disabled={loading}
                        error={fromErrors.email ? t(`errors.auth.${fromErrors.email}`, {defaultValue: fromErrors.email.toString()}) : undefined}
                    />
                </div>

                <div className="auth-form__section">
                    <Row className="g-3">
                        <Col xs={12} sm={12}>
                            <PrimaryTextInput
                                label="Nombre de usuario"
                                name="firstName"
                                required
                                disabled={loading}
                                error={fromErrors.firstName ? t(`errors.auth.${fromErrors.firstName}`, {defaultValue: fromErrors.firstName.toString()}) : undefined}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="auth-form__section">
                    <PrimaryTextInput
                        label={t("pages.register.form.password_label")}
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={loading}
                        error={fromErrors.password ? t(`errors.auth.${fromErrors.password}`, {defaultValue: fromErrors.password.toString()}) : undefined}
                    />
                    <PasswordStrengthMeter password={password}/>
                </div>

                <p className="auth-form__legal-disclaimer">
                    Al registrarte aceptas nuestra{' '}
                    <Link to="/politica-de-privacidad">Política de Privacidad</Link>,{' '}
                    el <Link to="/aviso-legal">Aviso Legal</Link> y los{' '}
                    <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>.
                </p>

                <div className="auth-form__submit">
                    <PrimaryButton
                        label={loading ? t('pages.register.form.submitting_button') : t('pages.register.form.submit_button')}
                        type="submit"
                        variant="primary"
                        trackId="submit_register_form"
                        disabled={loading}
                        fullWidth={true}
                    />
                </div>
            </form>
        </AuthLayout>
    )
}


