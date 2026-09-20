import { Result } from "neverthrow";
import Subscription from "@users/Domain/Entities/Subscription";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

/**
 * IGetSubscriptionUseCase
 * @description Interface for get subscription use case
 */
export default interface IGetSubscriptionUseCase {

    /**
     * Execute
     * @description Execute get subscription use case
     * @returns {Promise<Result<Subscription, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<Subscription, SubscriptionErrors>>;
}
