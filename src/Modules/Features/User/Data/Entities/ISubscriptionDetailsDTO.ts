export default interface ISubscriptionDetailsDTO {
    startDate: Date;
    endDate: Date;
    status: number;
    subscriptionStatus: number;
    checkoutSessionUrl?: string | null;
    checkoutSessionExpiresAt?: Date | null;
}
