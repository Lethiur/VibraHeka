import { INotificationProvider } from "@/core/Domain/Notifications/INotificationProvider";
import { useContext } from "react";
import ToastContext from "../Context/ToastContext";


export const UseToast = (): INotificationProvider => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};