import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import ISubscribeUseCase from "@users/Application/UseCases/Subscribe/ISubscribeUseCase";

/**
 * SubscribeUseCase
 * @description Subscribe use case implementation
 */
export default class SubscribeUseCase implements ISubscribeUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository
    ) { }

    /**
     * Execute
     * @description Execute subscribe use case
     * @returns {Promise<Result<string, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<string, SubscriptionErrors>> {
        return this.subscriptionRepository.Subscribe();
    }
}