import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * May change on API updates
 * @returns Custom Axios Instance
 */
export const useAuth = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosInstance.interceptors.request.use((reqConfig: CustomRequestConfig) => {
    const session = sessionStorage.getItem('session');
    if (session) {
      reqConfig.headers.Authorization = `Bearer ${JSON.parse(session).accessToken}`;
    }

    return reqConfig;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err instanceof AxiosError && err.response?.status === 401) {
        console.error('Invalid session: ', err);
        if (location.pathname !== '/login') {
          console.log('Redirecting to login');
          location.href = '/login';
        }
      } else {
        console.error(err);
      }

      throw err;
    }
  );

  return axiosInstance;
};
