import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import ISubscriptionDetailsDTO from "@users/Data/Entities/ISubscriptionDetailsDTO";
import { Result } from "neverthrow";


/**
 * SubscriptionDatasource
 * @description Datasource for subscription operations
 */
export default class SubscriptionDatasource extends BackendDatasource {

    /**
     * GetSubscriptionDetails
     * @description Get subscription details
     * @returns {Promise<Result<ISubscription, string>>}
     */
    public async GetSubscriptionDetails(): Promise<Result<ISubscriptionDetailsDTO, string>> {
        return this.get('/subscriptions', true);
    }

    /**
     * CancelSubscription
     * @description Cancel subscription
     * @returns {Promise<Result<void, string>>}
     */
    public async CancelSubscription(): Promise<Result<void, string>> {
        return this.patch('/subscriptions', {}, true);
    }

    /**
     * Subscribe
     * @description Subscribe to a plan
     * @returns {Promise<Result<string, string>>}
     */
    public async Subscribe(): Promise<Result<string, string>> {
        return this.put('/subscriptions', {}, true);
    }

    public async GetSubscriptionPortal(): Promise<Result<string, string>> {
        return this.get('/subscriptions/details', true);
    }

}