import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import useResetPassword from "@auth/Presentation/Hooks/useResetPassword";
import { ResetPasswordData } from "@auth/Domain/Entities/ResetPasswordData";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";
import PasswordConfirmationFields
    from "@auth/Presentation/Components/Molecules/PasswordConfirmationFields/PasswordConfirmationFields";
import { useState } from "react";

export default function ResetPassword() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const token: string = searchParams.get("token") || "";
    const hasToken: boolean = token.trim().length > 0;
    const { resetPassword, formErrors, error, loading, success } = useResetPassword();
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: ResetPasswordData = {
            EncryptedToken: token,
            NewPassword: (formData.get("newPassword") as string) || "",
            NewPasswordConfirmation: (formData.get("newPasswordConfirmation") as string) || ""
        };

        await resetPassword(data);
    }

    return (
        <AuthLayout title={t("pages.reset_password.title")} subtitle={t("pages.reset_password.description")}>
            <ErrorBox
                message={!hasToken ? t(`errors.auth.${AuthApplicationErrors.RESET_PASSWORD_TOKEN_NOT_PRESENT}`) : null}
                variant="danger"
            />
            <ErrorBox message={error ? t(`errors.auth.${error}`) : null} variant="danger" />
            <ErrorBox message={success ? t("pages.reset_password.form.success_message") : null} variant="success" />

            <form onSubmit={handleSubmit} noValidate>
                <PasswordConfirmationFields
                    passwordName="newPassword"
                    passwordLabel={t("pages.reset_password.form.password_label")}
                    passwordValue={newPassword}
                    onPasswordChange={(event) => setNewPassword(event.target.value)}
                    passwordHelpText={t("pages.reset_password.form.password_help")}
                    passwordError={formErrors.NewPassword ? t(`errors.auth.${formErrors.NewPassword}`) : undefined}
                    confirmationName="newPasswordConfirmation"
                    confirmationLabel={t("pages.reset_password.form.password_confirmation_label")}
                    confirmationValue={newPasswordConfirmation}
                    onConfirmationChange={(event) => setNewPasswordConfirmation(event.target.value)}
                    confirmationHelpText={t("pages.reset_password.form.password_confirmation_help")}
                    confirmationError={formErrors.NewPasswordConfirmation ? t(`errors.auth.${formErrors.NewPasswordConfirmation}`) : undefined}
                    disabled={loading || !hasToken}
                />

                <div className="auth-form__submit">
                    <PrimaryButton
                        label={loading ? t("pages.reset_password.form.submitting_button") : t("pages.reset_password.form.submit_button")}
                        type="submit"
                        variant="primary"
                        disabled={loading || !hasToken}
                        fullWidth={true}
                    />
                </div>
            </form>

            <div className="text-center mt-4">
                <Link to="/login" className="type-body text-decoration-none">
                    {t("pages.reset_password.form.back_to_login")}
                </Link>
            </div>
        </AuthLayout>
    );
}
