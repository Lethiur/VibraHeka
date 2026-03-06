import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import PasswordConfirmationFields
    from "@auth/Presentation/Components/Molecules/PasswordConfirmationFields/PasswordConfirmationFields";
import UseChangePassword from "@users/Presentation/Hooks/UseChangePassword";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { useTranslation } from "react-i18next";
import "./ChangePasswordModal.scss";

interface ChangePasswordModalProps {
    show: boolean;
    onHide: () => void;
}

const INITIAL_FORM_DATA: IChangePasswordData = {
    CurrentPassword: "",
    NewPassword: "",
    NewPasswordConfirmation: "",
};

export default function ChangePasswordModal({ show, onHide }: ChangePasswordModalProps) {
    const { ChangePassword, loading, formErrors, error, success } = UseChangePassword();
    const { ShowNotification } = UseToast();
    const { t } = useTranslation();

    const [formData, setFormData] = useState<IChangePasswordData>(INITIAL_FORM_DATA);

    const resetForm = () => setFormData(INITIAL_FORM_DATA);

    const handleClose = () => {
        resetForm();
        onHide();
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const translateProfileError = (errorCode?: string) => {
        if (!errorCode) return undefined;
        return t(`errors.profile.${errorCode}`, { defaultValue: errorCode });
    };

    useEffect(() => {
        if (!success) return;

        ShowNotification(
            t("pages.profile.change_password.success_title", { defaultValue: "Contrasena actualizada" }),
            t("pages.profile.change_password.success_message", { defaultValue: "La contrasena se actualizo correctamente." }),
            NotificationVariant.Success
        );
        handleClose();
    }, [success]);

    useEffect(() => {
        if (!error) return;

        ShowNotification(
            t("pages.profile.change_password.error_title", { defaultValue: "Error" }),
            translateProfileError(error.toString()) ??
            t("pages.profile.change_password.error_fallback", { defaultValue: "No se pudo cambiar la contrasena." }),
            NotificationVariant.Error
        );
    }, [error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await ChangePassword(formData);
    };

    const backendErrorMessage = error
        ? translateProfileError(error.toString()) ??
        t("pages.profile.change_password.error_fallback", { defaultValue: "No se pudo cambiar la contrasena." })
        : null;

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="change-password-modal">
            <Modal.Header closeButton>
                <Modal.Title>Cambiar contrasena</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} noValidate>
                    <ErrorBox message={backendErrorMessage} variant="danger" />

                    <PrimaryTextInput
                        name="CurrentPassword"
                        label="Contrasena actual"
                        type="password"
                        value={formData.CurrentPassword}
                        onChange={handleFieldChange}
                        showPasswordToggle={true}
                        disabled={loading}
                        error={translateProfileError(formErrors.CurrentPassword?.toString())}
                    />
                    <PasswordConfirmationFields
                        passwordName="NewPassword"
                        passwordLabel="Nueva contrasena"
                        passwordValue={formData.NewPassword}
                        onPasswordChange={handleFieldChange}
                        passwordError={translateProfileError(formErrors.NewPassword?.toString())}
                        confirmationName="NewPasswordConfirmation"
                        confirmationLabel="Repite la nueva contrasena"
                        confirmationValue={formData.NewPasswordConfirmation}
                        onConfirmationChange={handleFieldChange}
                        confirmationError={translateProfileError(formErrors.NewPasswordConfirmation?.toString())}
                        disabled={loading}
                    />

                    <div className="change-password-modal__actions">
                        <PrimaryButton
                            label="Cancelar"
                            variant="outline-danger"
                            onClick={handleClose}
                        />
                        <PrimaryButton
                            label={loading ? "Guardando..." : "Actualizar contrasena"}
                            variant="success"
                            type="submit"
                            disabled={loading}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

