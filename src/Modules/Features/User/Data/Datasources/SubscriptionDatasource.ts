import BackendDatasource from "@core/Data/Datasources/BackendDatasource";
import { Result} from "neverthrow";
import {
    Configuration, SubscriptionDetailsResponse,
    SubscriptionPortalResponse, SubscriptionResponse,
    SubscriptionsApi
} from "@/Generated/api/subscriptions";
import {BASE_PATH} from "@/Generated/api/subscriptions/base.ts";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys.ts";


/**
 * SubscriptionDatasource
 * @description Datasource for subscription operations
 */
export default class SubscriptionDatasource extends BackendDatasource {

    private Api: SubscriptionsApi;

    constructor() {
        super();
        const config: Configuration = new Configuration({
            accessToken: () => this.StorageService.getString(STORAGE_KEYS.AUTH_TOKEN) || ''
        });
        this.Api = new SubscriptionsApi(config, BASE_PATH, this.AxiosInstance);
    }

    /**
     * GetSubscriptionDetails
     * @description Get subscription details
     * @returns {Promise<Result<ISubscription, string>>}
     */
    public async GetSubscriptionDetails(): Promise<Result<SubscriptionDetailsResponse, string>> {
        return this.PerformAndUnwrap(this.Api.getSubscriptionStatus.bind(this));
    }

    /**
     * CancelSubscription
     * @description Cancel subscription
     * @returns {Promise<Result<void, string>>}
     */
    public async CancelSubscription(): Promise<Result<void, string>> {
        return this.PerformAndUnwrap(this.Api.cancelSubscription);
    }

    /**
     * Subscribe
     * @description Subscribe to a plan
     * @returns {Promise<Result<SubscriptionResponse, string>>}
     */
    public async Subscribe(): Promise<Result<SubscriptionResponse, string>> {
        return this.PerformAndUnwrap(this.Api.subscribe);
    }

    /**
     * GetSubscriptionPortal
     * @description Get subscription portal
     * @returns {Promise<Result<string, string>>}
     */
    public async GetSubscriptionPortal(): Promise<Result<SubscriptionPortalResponse, string>> {
        return this.PerformAndUnwrap(() => this.Api.getSubscriptionPortal());
    }

    /**
     * ReactivateSubscription
     * @description Reactivate subscription
     * @returns {Promise<Result<void, string>>}
     */
    public async ReactivateSubscription(): Promise<Result<void, string>> {
        return this.PerformAndUnwrap(this.Api.reactivateSubscription);
    }

}
