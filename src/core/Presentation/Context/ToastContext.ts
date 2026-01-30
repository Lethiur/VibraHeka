import { createContext } from "react";
import { INotificationProvider } from "@/core/Domain/Notifications/INotificationProvider";

const ToastContext = createContext<INotificationProvider | undefined>(undefined);

export default ToastContext;
