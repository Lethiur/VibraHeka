import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { Result } from "neverthrow";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import ICancelSubscriptionUseCase from "@users/Application/UseCases/CancelSubscription/ICancelSubscriptionUseCase";

/**
 * CancelSubscriptionUseCase
 * @description Cancel subscription use case implementation
 */
export default class CancelSubscriptionUseCase implements ICancelSubscriptionUseCase {

    /**
     * Constructor
     * @param subscriptionRepository 
     */
    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository
    ) { }

    /**
     * Execute
     * @description Execute cancel subscription use case
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    Execute(): Promise<Result<void, SubscriptionErrors>> {
        return this.subscriptionRepository.CancelSubscription();
    }
}