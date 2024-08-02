import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const config = {
  apiBaseUrl: 'https://tense-margy-jangkau-a8ec8afe.koyeb.app',
};

class Api {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  private async request(endpoint: string, options: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.request({
        url: endpoint,
        ...options,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        throw new Error('Undexpected error occurred');
      }
    }
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

const api = new Api(config.apiBaseUrl);

export default api;
