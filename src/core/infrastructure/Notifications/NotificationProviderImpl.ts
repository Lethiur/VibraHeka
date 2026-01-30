import { INotificationProvider, NotificationVariant } from "@/core/Domain/Notifications/INotificationProvider";

export type ToastVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

type ShowToastFn = (
    title: string,
    message: string,
    variant?: ToastVariant
) => void;


export default class NotificationProviderImpl implements INotificationProvider {


    constructor(private readonly showToast: ShowToastFn) { }

    ShowNotification(title: string, message: string, variant?: NotificationVariant | undefined): void {
        this.showToast(title, message, this.MapVariant(variant));
    }

    private MapVariant(type?: NotificationVariant): ToastVariant {
        switch (type) {
            case NotificationVariant.Success:
                return 'success';
            case NotificationVariant.Error:
                return 'danger';
            case NotificationVariant.Warning:
                return 'warning';
            case NotificationVariant.Info:
            default:
                return 'info';
        }
    }
}