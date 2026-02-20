import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

/**
 * IReactivateSubscriptionUseCase
 * @description Interface for reactivate subscription use case
 */
export default interface IReactivateSubscriptionUseCase {
    /**
     * Execute
     * @description Execute reactivate subscription use case
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<void, SubscriptionErrors>>;
}
