import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { err, ok, Result } from "neverthrow";
import ISubscription from "@users/Domain/Entities/ISubscription";
import ISubscriptionCreation from "@users/Domain/Entities/ISubscriptionCreation";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import SubscriptionDatasource from "@users/Data/Datasources/SubscriptionDatasource";
import ISubscriptionDetailsDTO from "@users/Data/Entities/ISubscriptionDetailsDTO";
import ISubscriptionCreationDTO from "@users/Data/Entities/ISubscriptionCreationDTO";

/**
 * SubscriptionRepositoryImpl
 * @description Implementation of ISubscriptionRepository
 */
export default class SubscriptionRepositoryImpl implements ISubscriptionRepository {

    constructor(private readonly subscriptionDatasource: SubscriptionDatasource) {

    }

    /**
     * GetSubscriptionDetails
     * @description Get subscription details
     * @returns {Promise<Result<ISubscription, SubscriptionErrors>>}
     */
    public async GetSubscriptionDetails(): Promise<Result<ISubscription, SubscriptionErrors>> {
        const result: Result<ISubscriptionDetailsDTO, string> = await this.subscriptionDatasource.GetSubscriptionDetails();
        return result.map(subscription => {
            return {
                StartDate: subscription.startDate,
                EndDate: subscription.endDate,
                Status: subscription.status,
                SubscriptionStatus: subscription.subscriptionStatus,
                CheckoutSessionUrl: subscription.checkoutSessionUrl ?? null,
                CheckoutSessionExpiresAt: subscription.checkoutSessionExpiresAt ?? null
            }
        }).mapErr(error => error as SubscriptionErrors);
    }

    /**
     * CancelSubscription
     * @description Cancel subscription
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    public async CancelSubscription(): Promise<Result<void, SubscriptionErrors>> {
        const result: Result<void, string> = await this.subscriptionDatasource.CancelSubscription();
        return result.mapErr(error => error as SubscriptionErrors);
    }

    /**
     * Subscribe
     * @description Subscribe to a plan
     * @returns {Promise<Result<ISubscriptionCreation, SubscriptionErrors>>}
     */
    public async Subscribe(): Promise<Result<ISubscriptionCreation, SubscriptionErrors>> {
        const result: Result<ISubscriptionCreationDTO, string> = await this.subscriptionDatasource.Subscribe();

        if (result.isErr()) {
            return err(result.error as SubscriptionErrors);
        }

        const dto = result.value;
        if (!dto.url || dto.url.length === 0) {
            return err("INVALID_SUBSCRIBE_RESPONSE" as SubscriptionErrors);
        }

        return ok({
            Url: dto.url,
            ExpiresAt: new Date(dto.expiresAt)
        });
    }

    public async GetSubscriptionPortal(): Promise<Result<string, SubscriptionErrors>> {
        const result: Result<string, string> = await this.subscriptionDatasource.GetSubscriptionPortal();
        return result.mapErr(error => error as SubscriptionErrors);
    }

    /**
     * ReactivateSubscription
     * @description Reactivate subscription
     * @returns {Promise<Result<void, SubscriptionErrors>>}
     */
    public async ReactivateSubscription(): Promise<Result<void, SubscriptionErrors>> {
        const result: Result<void, string> = await this.subscriptionDatasource.ReactivateSubscription();
        return result.mapErr(error => error as SubscriptionErrors);
    }

}
