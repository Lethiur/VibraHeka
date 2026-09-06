import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import useForgotPassword from "@auth/Presentation/Hooks/useForgotPassword";

/**
 * ForgotPassword component renders a password recovery form and handles the
 * submission process for initiating the forgot password workflow. The form includes
 * fields for entering an email address and manages its state and errors during the
 * form submission process.
 *
 * @return {JSX.Element} A React component containing the Forgot Password form and associated UI elements,
 * including input fields, error messages, success messages, and navigation links.
 */
export default function ForgotPassword(): JSX.Element {

    // Hooks
    const { t } = useTranslation();
    const { forgotPassword, formErrors, error, loading, success } = useForgotPassword();

    /**
     * Handles the form submission event by preventing the default behavior,
     * extracting form data, and invoking the forgotPassword function with the
     * extracted email address.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @return {Promise<void>} A promise that resolves when the form handling is complete.
     */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) : Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        forgotPassword({
            Email: (formData.get("email") as string) || ""
        });
    }

    return (
        <AuthLayout title={t("pages.forgot_password.title")} subtitle={t("pages.forgot_password.description")}>
            <ErrorBox message={error ? t(`errors.auth.${error}`) : null} variant="danger" />
            <ErrorBox message={success ? t("pages.forgot_password.form.success_message") : null} variant="success" />

            <form onSubmit={handleSubmit} noValidate>
                <PrimaryTextInput
                    label={t("pages.forgot_password.form.email_label")}
                    name="email"
                    type="email"
                    disabled={loading}
                    helpText={t("pages.forgot_password.form.email_help")}
                    error={formErrors.Email ? t(`errors.auth.${formErrors.Email}`) : undefined}
                />

                <div className="auth-form__submit">
                    <PrimaryButton
                        label={loading ? t("pages.forgot_password.form.submitting_button") : t("pages.forgot_password.form.submit_button")}
                        type="submit"
                        trackId="submit_forgot_password_form"
                        variant="primary"
                        disabled={loading}
                        fullWidth={true}
                    />
                </div>
            </form>

            <div className="text-center mt-4">
                <Link to="/login" className="type-body text-decoration-none">
                    {t("pages.forgot_password.form.back_to_login")}
                </Link>
            </div>
        </AuthLayout>
    );
}
