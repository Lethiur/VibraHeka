import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import useForgotPassword from "@auth/Presentation/Hooks/useForgotPassword";
import { ForgotPasswordData } from "@auth/Domain/Models/ForgotPasswordData";

export default function ForgotPassword() {
    const { t } = useTranslation();
    const { forgotPassword, formErrors, error, loading, success } = useForgotPassword();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: ForgotPasswordData = {
            email: (formData.get("email") as string) || ""
        };

        await forgotPassword(data);
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
                    error={formErrors.email ? t(`errors.auth.${formErrors.email}`) : undefined}
                />

                <div className="auth-form__submit">
                    <PrimaryButton
                        label={loading ? t("pages.forgot_password.form.submitting_button") : t("pages.forgot_password.form.submit_button")}
                        type="submit"
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
