import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export class Api {
  private axiosInstance: AxiosInstance;
  private token: string | null;
  private setToken: Dispatch<SetStateAction<string | null>>;

  constructor(
    baseUrl: string,
    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>
  ) {
    this.token = token;
    this.setToken = setToken;
    const customAxios = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },

      // withCredentials: true, // commented out because request's credentials are not actually sent through cookie for now
    });

    customAxios.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (axios.isAxiosError(err) && err.response) {
          const originalConfig = err.config as CustomAxiosRequestConfig;

          // resend request when status is 500, bcs seriously BEJ
          if (err.response.status === 500) {
            return customAxios(originalConfig);
          }
          // retry request when status is 401
          if (err.response.status === 401 && !originalConfig._retry) {
            // attach access token when response error data is unauthorized (indicates resource requires access token, but token is not present) and token exists
            // we do not need to manually add Auth header again on initial request
            if (err.response.data.error === 'unauthorized' && this.token)
              return customAxios({
                ...originalConfig,
                headers: {
                  ...originalConfig.headers,
                  Authorization: `Bearer ${this.token}`,
                },
              });

            // else indicates expired access token, continue to refresh access token
            originalConfig._retry = true;
            try {
              const refreshToken = Cookies.get('refresh-token');
              if (refreshToken && refreshToken.split('.').length === 3) {
                const res = await customAxios.get(
                  `/api/refresh-token?refresh_token=${Cookies.get('refresh-token')}`
                );
                Cookies.set('refresh-token', res.data.refresh_token);
                this.setToken(res.data.access_token);

                // retry the original request with new access token
                return customAxios({
                  ...originalConfig,
                  headers: {
                    ...originalConfig.headers,
                    Authorization: `Bearer ${res.data.access_token}`,
                  },
                });
              }
            } catch (err) {
              // uncaught error when refressing is printed to console
              console.error('Error refreshing access token: ', err);
            }
          }
        }

        // uncaught error is thrown to get catched by await api.method()
        throw err;
      }
    );

    this.axiosInstance = customAxios;
  }

  private async request(endpoint: string, options: AxiosRequestConfig) {
    const response = await this.axiosInstance.request({
      url: endpoint,
      ...options,
    });
    return response;
  }

  public get(endpoint: string, options?: AxiosRequestConfig) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  public post<T>(endpoint: string, body?: T, options?: AxiosRequestConfig) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      data: body,
    });
  }

  public put<T>(endpoint: string, body: T, options?: AxiosRequestConfig) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      data: body,
    });
  }

  public patch<T>(endpoint: string, body: T, options?: AxiosRequestConfig) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      data: body,
    });
  }

  public delete(endpoint: string, options?: AxiosRequestConfig) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}
