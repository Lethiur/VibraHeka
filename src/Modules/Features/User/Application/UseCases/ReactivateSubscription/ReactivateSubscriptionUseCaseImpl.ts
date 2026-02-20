import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import IReactivateSubscriptionUseCase from "@users/Application/UseCases/ReactivateSubscription/IReactivateSubscriptionUseCase";

/**
 * ReactivateSubscriptionUseCase
 * @description Reactivate subscription use case implementation
 */
export default class ReactivateSubscriptionUseCaseImpl implements IReactivateSubscriptionUseCase {

    /**
     * Constructor
     * @param subscriptionRepository 
     */
    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository
    ) { }

    /**
     * Execute
     * @description Execute reactivate subscription use case
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<void, SubscriptionErrors>> {
        return this.subscriptionRepository.ReactivateSubscription();
    }
}
