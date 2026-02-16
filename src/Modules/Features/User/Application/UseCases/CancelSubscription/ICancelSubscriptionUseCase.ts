import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

/**
 * ICancelSubscriptionUseCase
 * @description Interface for cancel subscription use case
 */
export default interface ICancelSubscriptionUseCase {
    /**
     * Execute
     * @description Execute cancel subscription use case
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<void, SubscriptionErrors>>;
}