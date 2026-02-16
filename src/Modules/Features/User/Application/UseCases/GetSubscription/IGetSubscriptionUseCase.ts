import { Result } from "neverthrow";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

/**
 * IGetSubscriptionUseCase
 * @description Interface for get subscription use case
 */
export default interface IGetSubscriptionUseCase {

    /**
     * Execute
     * @description Execute get subscription use case
     * @returns {Promise<Result<ISubscription, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<ISubscription, SubscriptionErrors>>;
}
