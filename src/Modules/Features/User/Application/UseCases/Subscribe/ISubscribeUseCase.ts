import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import ISubscriptionCreation from "@users/Domain/Entities/ISubscriptionCreation";

/**
 * ISubscribeUseCase
 * @description Interface for subscribe use case
 */
export default interface ISubscribeUseCase {

    /**
     * Execute
     * @description Execute subscribe use case
     * @returns {Promise<Result<ISubscriptionCreation, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<ISubscriptionCreation, SubscriptionErrors>>;
}
