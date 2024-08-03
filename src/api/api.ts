import axios, { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export class Api {
  private axiosInstance: AxiosInstance;
  private setToken: Dispatch<SetStateAction<string | null>>

  constructor(baseUrl: string, setToken: Dispatch<SetStateAction<string | null>>) {
    this.setToken = setToken
    const customAxios = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    customAxios.interceptors.response.use(res => res, async (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const originalConfig = err.config as CustomAxiosRequestConfig
        if (err.response.status === 500) {
          return customAxios(originalConfig)
        } else if (err.response.status === 401 && !originalConfig._retry) {
          console.log('Refreshing access token')
          originalConfig._retry = true
          try {
            const refreshToken = Cookies.get('refresh-token')
            if (refreshToken && refreshToken.split('.').length === 3) {
              const res = await axios.get(`/api/refresh-token?refresh_token=${Cookies.get('refresh-token')}`)
              console.log('setting token api')
              Cookies.set('refresh-token', res.data.refresh_token)
              this.setToken(res.data.access_token)
              return customAxios({
                ...originalConfig,
                headers: {
                  ...originalConfig.headers,
                  Authorization: `Bearer ${res.data.access_token}`
                }
              })
            }
          } catch (err) {
            console.error('Error refreshing access token: ', err)
          }
        }
      }

      throw err
    })

    this.axiosInstance = customAxios
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