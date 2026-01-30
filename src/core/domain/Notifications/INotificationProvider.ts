/**
 * Notification variant enum
 * @enum
 */
export enum NotificationVariant {
    Success,
    Error,
    Warning,
    Info,
}


/**
 * Notification interface
 * @interface
 */
export interface INotificationProvider {
    /**
     * Show notification
     * @param title - Notification title
     * @param message - Notification message
     * @param variant - Notification variant
     */
    ShowNotification: (title: string, message: string, variant?: NotificationVariant) => void;



}