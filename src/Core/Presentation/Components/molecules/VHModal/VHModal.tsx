import React from "react";
import { Modal, ModalProps } from "react-bootstrap";
import "./VHModal.scss";

// Extrapolamos ModalProps de react-bootstrap y añadimos className global
interface VHModalProps extends ModalProps {
    children: React.ReactNode;
}

const VHModalComponent: React.FC<VHModalProps> = ({ children, className, ...props }) => {
    return (
        <Modal {...props} className={`vh-modal ${className || ""}`}>
            {children}
        </Modal>
    );
};

// Adjuntamos los subcomponentes de React-Bootstrap para que funcionen igual
export const VHModal = Object.assign(VHModalComponent, {
    Header: Modal.Header,
    Title: Modal.Title,
    Body: Modal.Body,
    Footer: Modal.Footer,
    Dialog: Modal.Dialog,
});

export default VHModal;
