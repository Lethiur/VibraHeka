import { ReactNode } from "react";
import PrimaryButton, { ButtonProps } from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";

export interface ConfirmationModalProps {
    show: boolean;
    title: ReactNode;
    description: ReactNode;
    confirmLabel: ReactNode;
    cancelLabel: ReactNode;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    confirmVariant?: ButtonProps["variant"];
}

export default function ConfirmationModal({
    show,
    title,
    description,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    loading = false,
    confirmVariant = "primary",
}: ConfirmationModalProps) {
    const handleHide = (): void => {
        if (!loading) {
            onCancel();
        }
    };

    return (
        <VHModal
            show={show}
            backdrop={loading ? "static" : true}
            keyboard={!loading}
            onHide={handleHide}
            centered
        >
            <VHModal.Header closeButton={!loading}>
                <VHModal.Title>{title}</VHModal.Title>
            </VHModal.Header>
            <VHModal.Body>{description}</VHModal.Body>
            <VHModal.Footer>
                <PrimaryButton
                    variant="outline-secondary"
                    label={cancelLabel}
                    onClick={onCancel}
                    disabled={loading}
                />
                <PrimaryButton
                    variant={confirmVariant}
                    label={confirmLabel}
                    onClick={onConfirm}
                    disabled={loading}
                />
            </VHModal.Footer>
        </VHModal>
    );
}