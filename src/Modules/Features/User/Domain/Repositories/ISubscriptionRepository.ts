import { Result } from "neverthrow";
import Subscription from "@/Modules/Features/User/Domain/Entities/Subscription";
import ISubscriptionCreation from "@/Modules/Features/User/Domain/Entities/ISubscriptionCreation";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

/**
 * ISubscriptionRepository
 * @description Interface for subscription repository
 */
export default interface ISubscriptionRepository {
    /**
     * GetSubscriptionDetails
     * @description Get subscription details
     * @returns {Promise<Result<Subscription, SubscriptionErrors>>}
     */
    GetSubscriptionDetails(): Promise<Result<Subscription, SubscriptionErrors>>;
    /**
     * CancelSubscription
     * @description Cancel subscription
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    CancelSubscription(): Promise<Result<void, SubscriptionErrors>>;
    /**
     * Subscribe
     * @description Subscribe to a plan
     * @returns {Promise<Result<ISubscriptionCreation, SubscriptionErrors>>}
     */
    Subscribe(): Promise<Result<ISubscriptionCreation, SubscriptionErrors>>;

    /**
     * GetSubscriptionPortal
     * @description Get subscription portal
     * @returns {Promise<Result<string, SubscriptionErrors>>}
     */
    GetSubscriptionPortal(): Promise<Result<string, SubscriptionErrors>>;

    /**
     * ReactivateSubscription
     * @description Reactivate subscription
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    ReactivateSubscription(): Promise<Result<void, SubscriptionErrors>>;
}
