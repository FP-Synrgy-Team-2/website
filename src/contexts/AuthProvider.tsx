import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import { ResponseError } from '@/types/response';
import Cookies from 'js-cookie';
import Loading from '@/components/General/Loading';

export type AuthContextType = {
  isAuthenticated: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (
    body: { username: string; password: string },
    onSuccess: string,
    onError: string
  ) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  token: string | null;
  authResErrors: ResponseError | null;
  setAuthResErrors: React.Dispatch<React.SetStateAction<ResponseError | null>>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [authResErrors, setAuthResErrors] =
    React.useState<ResponseError | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();

  const refreshToken = React.useCallback(async () => {
    try {
      const response = await api.get(
        `/api/refresh-token?refresh_token=${Cookies.get('refresh_token')}`
      );
      if (response.status === 200) {
        setToken(response.data.access_token);
        setAuthResErrors(null);
      } else {
        setToken(null);
        setAuthResErrors(response.data);
      }
    } catch {
      setToken(null);
      setAuthResErrors({
        code: 500,
        data: null,
        message: 'something went wrong!',
        status: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refreshToken();
    const intervalId = setInterval(
      () => {
        refreshToken();
      },
      9 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, [refreshToken]);

  const login = async (
    body: {
      username: string;
      password: string;
    },
    onSuccess: string,
    onError: string
  ) => {
    try {
      setLoading(true);
      const response = await api.post<typeof body>('/api/auth/login', body);
      if (response.status === 200) {
        setToken(response.data.data.access_token);
        Cookies.set('refresh-token', response.data.data.refresh_token, {
          expires: 80,
        });
        setAuthResErrors(null);
        navigate(onSuccess, { replace: true });
      } else {
        setToken(null);
        setAuthResErrors(response.data);
        navigate(onError, { replace: true });
      }
    } catch (error) {
      setToken(null);
      setAuthResErrors({
        code: 500,
        data: null,
        message: 'something went wrong!',
        status: false,
      });
      navigate(onError, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('refresh_token');
  };

  return loading ? (
    <Loading size="5vw" bgSize="100vh" />
  ) : (
    <AuthContext.Provider
      value={{
        login,
        logout,
        setLoading,
        authResErrors,
        setAuthResErrors,
        isAuthenticated: !!token,
        token,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
