import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseEntity } from '../domain/ResponseEntity';
import { ok, err, Result } from 'neverthrow';

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        console.log('ApiClient initialized with Base URL:', BASE_URL);
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private async request<T>(config: AxiosRequestConfig): Promise<Result<T, string>> {
        try {
            const response: AxiosResponse<ResponseEntity<T>> = await this.axiosInstance.request(config);
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

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Result<T, string>> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }
}

export const apiClient = new ApiClient();
