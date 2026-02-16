import { OrderStatus } from "@users/Domain/Entities/OrderStatus";
import { SubscriptionStatus } from "@users/Domain/Entities/SubscriptionStatus";

export default interface ISubscription {
    StartDate: Date;
    EndDate: Date;
    Status: OrderStatus;
    SubscriptionStatus: SubscriptionStatus;
}