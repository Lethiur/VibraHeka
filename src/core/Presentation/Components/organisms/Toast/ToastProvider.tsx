import { NotificationVariant } from '@/core/Domain/Notifications/INotificationProvider';
import ToastContext from '@/core/Presentation/Context/ToastContext';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastMessage {
    id: number;
    title: string;
    message: string;
    variant: NotificationVariant;
}


export default function ToastProvider({ children }: { children: ReactNode }) {

    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const ShowNotification = useCallback((title: string, message: string, variant: NotificationVariant = NotificationVariant.Info) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, title, message, variant }]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ ShowNotification }}>
            {children}
            <ToastContainer className="p-3" position="top-end" style={{ zIndex: 9999, position: 'fixed' }}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        onClose={() => removeToast(toast.id)}
                        show={true}
                        delay={5000}
                        autohide
                        bg={"success"}
                    >
                        <Toast.Header>
                            <strong className="me-auto">{toast.title}</strong>
                        </Toast.Header>
                        <Toast.Body className={[NotificationVariant.Error, NotificationVariant.Success, NotificationVariant.Info].includes(toast.variant) ? 'text-white' : ''}>
                            {toast.message}
                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};


