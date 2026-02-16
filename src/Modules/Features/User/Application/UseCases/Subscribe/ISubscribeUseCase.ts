import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";

/**
 * ISubscribeUseCase
 * @description Interface for subscribe use case
 */
export default interface ISubscribeUseCase {

    /**
     * Execute
     * @description Execute subscribe use case
     * @returns {Promise<Result<string, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<string, SubscriptionErrors>>;
}