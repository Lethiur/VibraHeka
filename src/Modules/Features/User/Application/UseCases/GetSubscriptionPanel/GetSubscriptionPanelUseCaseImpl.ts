import { Result } from "neverthrow";
import IGetSubscriptionPanelUseCase from "./IGetSubscriptionPanelUseCase";
import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";

export default class GetSubscriptionPanelUseCaseImpl implements IGetSubscriptionPanelUseCase {

    constructor(private readonly subscriptionRepository: ISubscriptionRepository) { }

    Execute(): Promise<Result<string, string>> {
        return this.subscriptionRepository.GetSubscriptionPortal();
    }

}