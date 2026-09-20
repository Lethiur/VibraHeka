export enum OrderStatus {
    PENDING = "draft",
    PAYMENT_PENDING = "pendingPayment",
    ORDER_PAYED = "Paid",
    INVOICE_PAYED = "PartiallyRefunded",
    ORDER_DELAYED = "Refunded",
    PAYMENT_FAILED = "Failed",
    CANCELLED = "Cancelled",
    ENABLED_FOR_RETRY = "enabledForRetry",
}