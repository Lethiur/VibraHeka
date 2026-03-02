import { OrderStatus } from "@/Modules/Features/User/Domain/Enums/OrderStatus";
import { SubscriptionStatus } from "@/Modules/Features/User/Domain/Enums/SubscriptionStatus";

export default interface ISubscription {
    StartDate: Date;
    EndDate: Date;
    Status: OrderStatus;
    SubscriptionStatus: SubscriptionStatus;
    CheckoutSessionUrl?: string | null;
    CheckoutSessionExpiresAt?: Date | null;
}
