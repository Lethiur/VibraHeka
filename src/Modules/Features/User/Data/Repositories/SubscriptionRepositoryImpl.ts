import ISubscriptionRepository from "@users/Domain/Repositories/ISubscriptionRepository";
import { Result } from "neverthrow";
import ISubscription from "@users/Domain/Entities/ISubscription";
import { SubscriptionErrors } from "@users/Domain/Errors/SubscriptionErrors";
import SubscriptionDatasource from "@users/Data/Datasources/SubscriptionDatasource";
import ISubscriptionDetailsDTO from "@users/Data/Entities/ISubscriptionDetailsDTO";

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
                SubscriptionStatus: subscription.subscriptionStatus
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
     * @returns {Promise<Result<string, SubscriptionErrors>>}
     */
    public async Subscribe(): Promise<Result<string, SubscriptionErrors>> {
        const result: Result<string, string> = await this.subscriptionDatasource.Subscribe();
        return result.mapErr(error => error as SubscriptionErrors);
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