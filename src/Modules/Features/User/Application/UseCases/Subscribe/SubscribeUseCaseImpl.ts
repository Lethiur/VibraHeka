import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import ISubscribeUseCase from "@users/Application/UseCases/Subscribe/ISubscribeUseCase";
import ISubscriptionCreation from "@users/Domain/Entities/ISubscriptionCreation";

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
     * @returns {Promise<Result<ISubscriptionCreation, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<ISubscriptionCreation, SubscriptionErrors>> {
        return this.subscriptionRepository.Subscribe();
    }
}
