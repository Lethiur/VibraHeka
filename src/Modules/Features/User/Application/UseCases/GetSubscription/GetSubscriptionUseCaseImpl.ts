import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { Result } from "neverthrow";
import Subscription from "@users/Domain/Entities/Subscription";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import IGetSubscriptionUseCase from "@users/Application/UseCases/GetSubscription/IGetSubscriptionUseCase";

/**
 * GetSubscriptionUseCase is responsible for orchestrating the process
 * of retrieving subscription details. It serves as an implementation
 * of the IGetSubscriptionUseCase interface.
 */
export default class GetSubscriptionUseCase implements IGetSubscriptionUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository
    ) { }

    Execute(): Promise<Result<Subscription, SubscriptionErrors>> {
        return this.subscriptionRepository.GetSubscriptionDetails();
    }
}