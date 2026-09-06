import {OrderStatus} from "@users/Domain/Enums/OrderStatus.ts";
import {SubscriptionStatus} from "@users/Domain/Enums/SubscriptionStatus.ts";

export default interface ISubscription {
    StartDate: Date;
    EndDate: Date;
    Status: OrderStatus;
    SubscriptionStatus: SubscriptionStatus;
    CheckoutSessionUrl?: string | null;
    CheckoutSessionExpiresAt?: Date | null;
}
