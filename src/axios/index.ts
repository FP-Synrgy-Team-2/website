import axiosDefault, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const authRequestInterceptorFn = (reqConfig: CustomRequestConfig) => {
  const session = sessionStorage.getItem('session');
  if (session) {
    reqConfig.headers.Authorization = `Bearer ${JSON.parse(session).accessToken}`;
  }

  return reqConfig;
};

export const createAuthErrorResponseInterceptor = (
  axiosInstance: AxiosInstance
) => {
  return (err: AxiosError) => {
    if (err.config && err.response) {
      const originalReqConfig = err.config;
      if (err.response.status === 401) {
        console.error('Invalid session: ', err);
        // if (location.pathname !== '/login') {
        //   console.log('Redirecting to login');
        //   sessionStorage.removeItem('session');
        //   location.href = '/login';
        // }
      } else if (err.response.status > 499)
        return axiosInstance(originalReqConfig);
      else console.error(err);
    }
    return Promise.reject(err);
  };
};

const axios = axiosDefault.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptorFn);

axios.interceptors.response.use(
  (res) => res,
  createAuthErrorResponseInterceptor(axios)
);

export { axios };
