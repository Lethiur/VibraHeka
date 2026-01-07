import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {err, ok, Result} from "neverthrow";
import {ResponseEntity} from "@core/Domain/Entities/ResponseEntity.ts";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService.ts";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys.ts";

const BASE_URL: string = import.meta.env.VITE_API_URL || "/api/v1";

/**
 * Represents a data source for making API requests using Axios.
 */
export default class ApiDatasource {

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
        console.log('ApiDatasource initialized with Base URL:', BASE_URL);
        this.AxiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Sends an HTTP request using Axios and processes the response.
     *
     * @param {AxiosRequestConfig} config - The configuration object for the Axios request.
     * @param {boolean} includeToken - Determines if the request should include an authorization token. Defaults to false.
     * @return {Promise<Result<T, string>>} A promise that resolves to a `Result` object containing either the response content or an error message.
     */
    private async request<T>(config: AxiosRequestConfig, includeToken: boolean = false): Promise<Result<T, string>> {
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
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                const errorData = error.response.data as ResponseEntity<T>;
                console.log(errorData);
                return err(errorData.errorCode || 'UNKNOWN_ERROR');
            }
            return err('NETWORK_ERROR');
        }
    }

    public async get<T>(url: string, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({...config, method: 'GET', url}, includeToken);
    }

    public async post<T>(url: string, data: any = {}, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({...config, method: 'POST', url, data}, includeToken);
    }

    public async put<T>(url: string, data: any = {}, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({...config, method: 'PUT', url, data}, includeToken);
    }

    public async delete<T>(url: string, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({...config, method: 'DELETE', url}, includeToken);
    }

    public async patch<T>(url: string, data: any = {}, includeToken: boolean = false, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({...config, method: 'PATCH', url, data}, includeToken);
    }
}