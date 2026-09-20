import { OrderStatus } from "@users/Domain/Enums/OrderStatus";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";

export default class Subscription {
    constructor(
        public StartDate: Date,
        public EndDate: Date,
        public Status: OrderStatus,
        public SubscriptionStatus: SubscriptionStatus,
        public CheckoutSessionUrl: string | null = null,
        public CheckoutSessionExpiresAt: Date | null = null,
    ) {}

    isPaymentPending(): boolean {
        return this.Status === OrderStatus.PAYMENT_PENDING || this.Status === OrderStatus.ENABLED_FOR_RETRY;
    }

    canResumePayment(): boolean {
        return Boolean(this.CheckoutSessionUrl);
    }

    isActive(): boolean {
        return this.SubscriptionStatus === SubscriptionStatus.ACTIVE || this.SubscriptionStatus === SubscriptionStatus.TRIALING;
    }
}
