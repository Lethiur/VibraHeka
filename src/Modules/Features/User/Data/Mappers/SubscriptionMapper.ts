import Subscription from "@users/Domain/Entities/Subscription";
import { OrderStatus } from "@users/Domain/Enums/OrderStatus";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";
import {
    SubscriptionDetailsResponse, SubscriptionDetailsResponseStatusEnum,
    SubscriptionDetailsResponseSubscriptionStatusEnum
} from "@/Generated/api/subscriptions";

function mapOrderStatus(status: SubscriptionDetailsResponseStatusEnum): OrderStatus {
    switch (String(status)) {
        case SubscriptionDetailsResponseStatusEnum.Draft:
            return OrderStatus.PENDING;
        case SubscriptionDetailsResponseStatusEnum.PendingPayment:
            return OrderStatus.PAYMENT_PENDING;
        case SubscriptionDetailsResponseStatusEnum.Paid:
        case "paid":
            return OrderStatus.ORDER_PAYED;
        case SubscriptionDetailsResponseStatusEnum.PartiallyRefunded:
            return OrderStatus.INVOICE_PAYED;
        case SubscriptionDetailsResponseStatusEnum.Refunded:
            return OrderStatus.CANCELLED;
        case SubscriptionDetailsResponseStatusEnum.Cancelled:
            return OrderStatus.CANCELLED;
        case SubscriptionDetailsResponseStatusEnum.Failed:
            return OrderStatus.PAYMENT_FAILED;
        default:
            return OrderStatus.PENDING;
    }
}

function mapSubscriptionStatus(
    status: SubscriptionDetailsResponseSubscriptionStatusEnum
): SubscriptionStatus {
    switch (String(status)) {
        case SubscriptionDetailsResponseSubscriptionStatusEnum.Created:
            return SubscriptionStatus.CREATED;
        case SubscriptionDetailsResponseSubscriptionStatusEnum.Active:
            return SubscriptionStatus.ACTIVE;
        case SubscriptionDetailsResponseSubscriptionStatusEnum.ToBeCancelled:
            return SubscriptionStatus.TO_BE_CANCELLED;
        case SubscriptionDetailsResponseSubscriptionStatusEnum.Cancelled:
            return SubscriptionStatus.CANCELLED;
        case SubscriptionDetailsResponseSubscriptionStatusEnum.Inactive:
            return SubscriptionStatus.CANCELLED;
        case SubscriptionDetailsResponseSubscriptionStatusEnum.Trailing:
        case "trialing":
            return SubscriptionStatus.TRIALING;
        default:
            return SubscriptionStatus.CREATED;
    }
}

export function mapSubscriptionDetailsDTO(dto: SubscriptionDetailsResponse): Subscription {
    return new Subscription(
        new Date(dto.startDate),
        new Date(dto.endDate),
        mapOrderStatus(dto.status),
        mapSubscriptionStatus(dto.subscriptionStatus),
        dto.checkoutSessionUrl || null,
        dto.checkoutSessionExpiresAt ? new Date(dto.checkoutSessionExpiresAt) : null,
    );
}