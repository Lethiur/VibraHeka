import React from "react";
import {useTranslation} from "react-i18next";
import useLoginUser from "@auth/Presentation/Hooks/useLoginUser";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import ReactGA from "react-ga4";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {AuthenticationResult} from "@auth/Domain/ValueObjects/AuthenticationResult.ts";


/**
 * Renders the Login component, providing functionality for user authentication.
 *
 * The component includes form elements for users to input their email and password.
 * It handles user interaction, validation, and submits the login form for authentication.
 * Successful authentication triggers navigation to the main activities page, while specific
 * authentication errors (e.g., unconfirmed accounts) are handled appropriately with user feedback.
 *
 * Internally, it uses services for localStorage access, navigation, and user login.
 * It also employs Google Analytics for tracking authenticated user sessions.
 *
 * @return {JSX.Element} The JSX structure of the Login component, including a login form and necessary handlers.
 */
export default function Login(): JSX.Element {

    // Hooks and services
    const {t} = useTranslation();
    const localStorage: LocalStorageService = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();
    const {loading, error, formErrors, loginUser} = useLoginUser();

    /**
     * Tracks user information for analytics purposes.
     *
     * @param {string} id - The unique identifier of the user.
     * @param {string} email - The email address of the user.
     * @return {void} No return value.
     */
    function trackUser(id: string, email: string): void {
        ReactGA.set({
            user_id: id,
            email: email
        });
    }

    /**
     * Handles the successful login process by decoding the authentication token,
     * tracking the user, updating authentication status, and navigating to a specific
     * route.
     *
     * @param {AuthenticationResult} data - The result of the authentication process, containing the access token and other relevant information.
     * @param {string} email - The email address of the user who logged in.
     * @return {void} This method does not return a value.
     */
    function handleLoginSuccess(data: AuthenticationResult, email: string) : void {
        const decoded = jwtDecode<JwtPayload>(data.accessToken);
        trackUser(decoded.sub ?? "", email);
        localStorage.remove(STORAGE_KEYS.PASSWORD);
    }

    /**
     * Handles the login error scenarios and performs appropriate actions based on the error type.
     *
     * @param {AuthErrorCodes} error - The error code representing the type of authentication error encountered.
     * @param {string} email - The email address of the user involved in the login process.
     * @return {void} This function does not return any value.
     */
    function handleLoginError(error: AuthErrorCodes, email: string): void {
        if (error == AuthErrorCodes.USER_NOT_CONFIRMED) {
            localStorage.setString(STORAGE_KEYS.EMAIL, email);
            navigate('/cuenta-inactiva');
        }
    }

    /**
     * Handles the form submission event, processes the form data, and initiates the login process.
     * Prevents the default form submission behavior to handle the data asynchronously.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event triggered by the user.
     * @return {Promise<void>} A promise that resolves when the login process is completed.
     */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        loginUser({
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }, {
            onSuccess: (data) => {
               handleLoginSuccess(data, formData.get('email') as string);
            }, onError: (error) => {
                handleLoginError(error, formData.get('email') as string);
            }
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


