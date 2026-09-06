import ISubscription from "@users/Domain/Entities/ISubscription";
import { OrderStatus } from "@users/Domain/Enums/OrderStatus";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";
import {
    SubscriptionDetailsResponse, SubscriptionDetailsResponseStatusEnum,
    SubscriptionDetailsResponseSubscriptionStatusEnum
} from "@/Generated/api/subscriptions";

function mapOrderStatus(status: SubscriptionDetailsResponseStatusEnum): OrderStatus {
    switch (status) {
        case SubscriptionDetailsResponseStatusEnum.Draft:
            return OrderStatus.PENDING;
        case SubscriptionDetailsResponseStatusEnum.PendingPayment:
            return OrderStatus.PAYMENT_PENDING;
        case SubscriptionDetailsResponseStatusEnum.Paid:
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
    switch (status) {
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
            return SubscriptionStatus.TRIALING;
        default:
            return SubscriptionStatus.CREATED;
    }
}

export function mapSubscriptionDetailsDTO(dto: SubscriptionDetailsResponse): ISubscription {
    return {
        StartDate: new Date(dto.startDate),
        EndDate: new Date(dto.endDate),
        Status: mapOrderStatus(dto.status),
        SubscriptionStatus: mapSubscriptionStatus(dto.subscriptionStatus),
        CheckoutSessionUrl: dto.checkoutSessionUrl || null,
        CheckoutSessionExpiresAt: new Date(dto.checkoutSessionExpiresAt),
    };
}