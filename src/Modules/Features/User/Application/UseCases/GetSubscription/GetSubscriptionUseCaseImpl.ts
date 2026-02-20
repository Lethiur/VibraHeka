import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { Result } from "neverthrow";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import IGetSubscriptionUseCase from "@users/Application/UseCases/GetSubscription/IGetSubscriptionUseCase";

export default class GetSubscriptionUseCase implements IGetSubscriptionUseCase {

    constructor(
        private readonly subscriptionRepository: ISubscriptionRepository
    ) { }

    Execute(): Promise<Result<ISubscription, SubscriptionErrors>> {
        return this.subscriptionRepository.GetSubscriptionDetails();
    }
}