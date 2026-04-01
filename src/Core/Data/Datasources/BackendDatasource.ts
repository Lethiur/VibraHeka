import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { err, ok, Result } from "neverthrow";
import { ResponseEntity } from "@core/Domain/Entities/ResponseEntity";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";

const BASE_URL: string =   import.meta.env.VITE_API_BASE_URL || "/api/v1";
let refreshInFlight: Promise<Result<string, string>> | null = null;
let lastUnauthorizedEventAtMs = 0;

const UNAUTHORIZED_EVENT = "auth:unauthorized";
const UNAUTHORIZED_EVENT_THROTTLE_MS = 1000;

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
    private AxiosInstance: AxiosInstance;

    constructor(private StorageService: LocalStorageService = new LocalStorageService()) {
        this.AxiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private notifyUnauthorized(): void {
        if (typeof window === "undefined") return;
        const now = Date.now();
        if (now - lastUnauthorizedEventAtMs < UNAUTHORIZED_EVENT_THROTTLE_MS) return;
        lastUnauthorizedEventAtMs = now;
        window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }

    private isRefreshTokenRequest(config: AxiosRequestConfig): boolean {
        const url = config.url || "";
        return url.includes("/auth/refresh-token");
    }

    private async refreshAuthToken(): Promise<Result<string, string>> {
        if (refreshInFlight) return refreshInFlight;

        const refreshToken = this.StorageService.getString(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) return err("UNAUTHORIZED");

        const email = this.StorageService.getString(STORAGE_KEYS.EMAIL) || "";

        refreshInFlight = (async () => {
            try {
                return await this.refreshToken(refreshToken, email);
            } finally {
                refreshInFlight = null;
            }
        })();

        return refreshInFlight;
    }

    /**
     * Sends an HTTP request using Axios and processes the response.
     *
     * @param {AxiosRequestConfig} config - The configuration object for the Axios request.
     * @param {boolean} includeToken - Determines if the request should include an authorization token. Defaults to false.
     * @return {Promise<Result<T, string>>} A promise that resolves to a `Result` object containing either the response content or an error message.
     */
    private async request<T>(config: AxiosRequestConfig, includeToken: boolean = false, hasRetriedAfterRefresh: boolean = false): Promise<Result<T, string>> {
        try {
            if (includeToken) {
                const token = this.StorageService.getString(STORAGE_KEYS.AUTH_TOKEN) || '';
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`
                };
            }
            const response: AxiosResponse<ResponseEntity<T>> = await this.AxiosInstance.request(config);
            if (response.data.success) {
                return ok(response.data.content!);
            }
            return err(response.data.errorCode || 'UNKNOWN_ERROR');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const status = axiosError.response.status;
                    if (status === 401) {
                        // If the request was authenticated, try refresh once (except when calling refresh endpoint itself).
                        if (
                            includeToken &&
                            !hasRetriedAfterRefresh &&
                            !this.isRefreshTokenRequest(config)
                        ) {
                            const refreshResult = await this.refreshAuthToken();
                            if (refreshResult.isOk()) {
                                this.StorageService.setString(STORAGE_KEYS.AUTH_TOKEN, refreshResult.value);
                                return this.request<T>(config, includeToken, true);
                            }
                            this.notifyUnauthorized();
                            return err("UNAUTHORIZED");
                        }

                        // For any other 401, normalize to UNAUTHORIZED. Only broadcast for protected calls.
                        if (includeToken) this.notifyUnauthorized();
                        return err("UNAUTHORIZED");
                    }

                    if (axiosError.response.data) {
                        const errorData = axiosError.response.data as ResponseEntity<T>;
                        return err(errorData.errorCode || 'UNKNOWN_ERROR');
                    } else {
                        // Non-401 without body
                        return err('NETWORK_ERROR');
                    }
                } else {
                    return err('NETWORK_ERROR');
                }
            }
            return err('NETWORK_ERROR');
        }
    }
    
    public async refreshToken(refreshToken: string, email : string) : Promise<Result<string, string>> {
       return this.post<string>('/auth/refresh-token', { RefreshToken: refreshToken, Username: email });
    }

    public async get<T>(url: string, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'GET', url }, includeToken);
    }

    public async post<T>(url: string, data: any = {}, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'POST', url, data }, includeToken);
    }

    public async put<T>(url: string, data: any = {}, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'PUT', url, data }, includeToken);
    }

    public async delete<T>(url: string, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'DELETE', url }, includeToken);
    }

    public async patch<T>(url: string, data: any = {}, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'PATCH', url, data }, includeToken);
    }
}
