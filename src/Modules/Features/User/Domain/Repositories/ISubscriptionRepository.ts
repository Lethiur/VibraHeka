import { Result } from "neverthrow";
import ISubscription from "@/Modules/Features/User/Domain/Entities/ISubscription";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

/**
 * ISubscriptionRepository
 * @description Interface for subscription repository
 */
export default interface ISubscriptionRepository {
    /**
     * GetSubscriptionDetails
     * @description Get subscription details
     * @returns {Promise<Result<ISubscription, SubscriptionErrors>>}
     */
    GetSubscriptionDetails(): Promise<Result<ISubscription, SubscriptionErrors>>;
    /**
     * CancelSubscription
     * @description Cancel subscription
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    CancelSubscription(): Promise<Result<void, SubscriptionErrors>>;
    /**
     * Subscribe
     * @description Subscribe to a plan
     * @returns {Promise<Result<string, SubscriptionErrors>>}
     */
    Subscribe(): Promise<Result<string, SubscriptionErrors>>;


    GetSubscriptionPortal(): Promise<Result<string, SubscriptionErrors>>
}