import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import { err, ok, Result } from "neverthrow";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import {AuthenticationApi, RefreshTokenRequest, RefreshTokenResponse} from "@/Generated/api/authentication";
import {BASE_PATH} from "@/Generated/api/subscriptions/base.ts";
import {BadRequestResponse} from "@/Generated/api/users";

export const BASE_URL: string =   import.meta.env.VITE_API_BASE_URL || "/api/v1";
let refreshInFlight: Promise<Result<string, string>> | null = null;
let lastUnauthorizedEventAtMs = 0;

const UNAUTHORIZED_EVENT = "auth:unauthorized";
const UNAUTHORIZED_EVENT_THROTTLE_MS = 1000;

declare module 'axios' {
    interface InternalAxiosRequestConfig {
        _retry?: boolean;
    }
}

/**
 * Represents a data source for making API requests using Axios.
 */
export default class BackendDatasource {

    /**
     * An instance of Axios used for making HTTP requests.
     *
     * The AxiosInstance is a pre-configured object that simplifies
     * sending HTTP requests with custom configuration options. It can
     * be used to set base URLs, headers, timeouts, and other request
     * parameters, enabling consistent communication with APIs.
     *
     * It provides methods such as `get`, `post`, `put`, `delete`, etc.,
     * for performing the respective HTTP operations. Additionally, interceptors
     * can be attached to the instance for request/response customization.
     */
    protected AxiosInstance: AxiosInstance;

    /**
     * An instance of the AuthenticationApi class used to handle
     * authentication-related functionality such as user login,
     * logout, and token management. Provides methods to interact
     * with the authentication system and perform secure operations.
     */
    private authApi: AuthenticationApi;

    /**
     * Constructs an instance of the class with a customizable local storage service and initializes
     * an Axios instance with default base URL and headers. It also sets up an Axios response
     * interceptor for handling unauthorized responses, including token refresh logic.
     *
     * @param {LocalStorageService} StorageService - An optional instance of `LocalStorageService` used for managing authentication tokens. Defaults to a new instance of `LocalStorageService`.
     * @return {void}
     */
    constructor(protected StorageService: LocalStorageService = new LocalStorageService()) {
        this.AxiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.authApi = new AuthenticationApi(undefined, BASE_PATH, this.AxiosInstance);

        this.AxiosInstance.interceptors.response.use(response => {
            return response;
        }, async (error : AxiosError) => {
            const originalRequest : InternalAxiosRequestConfig<any, any> | undefined = error.config;

            if (error.response?.status !== 401 || originalRequest?._retry === true) {
                this.notifyUnauthorized();
                throw error;
            }

            originalRequest!._retry = true;

            const refreshResult: Result<string,string> = await this.refreshAuthToken();
            if (refreshResult.isOk()) {
                this.StorageService.setString(STORAGE_KEYS.AUTH_TOKEN, refreshResult.value);
                return this.AxiosInstance.request(originalRequest!);
            }
            this.notifyUnauthorized();
            throw error;
        });
    }

    /**
     * Notifies the system of an unauthorized access event by dispatching a custom event.
     * Prevents event spamming by throttling consecutive notifications within a defined time interval.
     *
     * @return {void} Does not return a value.
     */
    private notifyUnauthorized(): void {
        if (typeof window === "undefined") return;
        const now = Date.now();
        if (now - lastUnauthorizedEventAtMs < UNAUTHORIZED_EVENT_THROTTLE_MS) return;
        lastUnauthorizedEventAtMs = now;
        window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }

    /**
     * Refreshes the authentication token using the stored refresh token and email.
     * If a refresh operation is already in progress, it returns the in-flight promise.
     * Upon successful token refresh, the new access token is returned.
     * If the refresh token is not available, the method returns an error result with "UNAUTHORIZED".
     *
     * @return {Promise<Result<string, string>>} A promise that resolves to a Result containing the new access token as a string on success, or an error message as a string on failure.
     */
    private async refreshAuthToken(): Promise<Result<string, string>> {
        if (refreshInFlight) return refreshInFlight;

        const refreshToken : string | null = this.StorageService.getString(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) return err("UNAUTHORIZED");

        const email : string = this.StorageService.getString(STORAGE_KEYS.EMAIL) || "";

        refreshInFlight = (async () => {
            try {
                const refreshTokenRequest : RefreshTokenRequest = {
                    refreshToken: refreshToken,
                    email: email
                };
                 const result : Result<RefreshTokenResponse, string> = await this.PerformAndUnwrap(() => this.authApi.refreshToken(refreshTokenRequest));
                 return result.map(response => response.accessToken);
            } finally {
                refreshInFlight = null;
            }
        })();

        return refreshInFlight;
    }

    /**
     * Executes the given callback function that returns a Promise of an AxiosResponse,
     * and unwraps the result, handling errors and extracting data or error codes as appropriate.
     *
     * @param {() => Promise<AxiosResponse<T>>} callback - A function that returns a Promise resolving to an AxiosResponse of type T.
     * @return {Promise<Result<T, string>>} A Promise resolving to a `Result` object, where success contains the unwrapped data of type T,
     *                                      and failure contains an error code as a string.
     */
    protected async PerformAndUnwrap<T>(callback: () => Promise<AxiosResponse<T>> ) : Promise<Result<T, string>> {
        try {
            const result : AxiosResponse<T> = await callback();
            return ok(result.data);
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError<BadRequestResponse>(e)) {
                const axiosError = e as AxiosError<BadRequestResponse>;
                if (axiosError !== undefined) {
                    return err(axiosError.response!.data.errorCode);
                }
            }
            return err('U-000');
        }
    }
}
