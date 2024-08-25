import {
  Dispatch,
  createContext,
  SetStateAction,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '@/api/api';
import { ResponseError } from '@/types/response';
import Cookies from 'js-cookie';
import Loading from '@/components/General/Loading';
import { jwtDecode } from 'jwt-decode';
import { CustomJWTPayload } from '@/types';
import { VITE_API_URL } from '@/constants';

export type AuthContextType = {
  isAuthenticated: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  login: (
    body: { username: string; password: string },
    onSuccess: string,
    onError: string
  ) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  userId: string | null;
  token: string | null;
  authResErrors: ResponseError | null;
  setAuthResErrors: Dispatch<SetStateAction<ResponseError | null>>;
  api: Api;
};
interface JwtPayload {
  aud: string[];
  user_id: string;
  user_name: string;
  scope: string[];
  ati: string;
  exp: number; // Expiry time in Unix timestamp
  authorities: string[];
  jti: string;
  client_id: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [authResErrors, setAuthResErrors] = useState<ResponseError | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // custom api to be used when your request needs auth
  const api = useMemo(() => new Api(VITE_API_URL, token, setToken), [token]);

  const getToken = () => Cookies.get('refresh-token');

  const isTokenExpired = (token: string) => {
    if (!token) return true;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const refreshToken = useCallback(async () => {
    try {
      const token = getToken();
      if (!token || isTokenExpired(token)) {
        // Remove expired token from cookies
        Cookies.remove('refresh-token');
        throw new Error('Not authenticated or token expired');
      }

      const response = await api.get(
        `/api/refresh-token?refresh_token=${Cookies.get('refresh-token')}`
      );
      if (response.status === 200) {
        // save userId on mount for cases when user closes or reloads page but not logged-off
        if (!userId)
          setUserId(
            jwtDecode<CustomJWTPayload>(response.data.access_token).user_id
          );

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
  }, [api, setToken, setAuthResErrors, setLoading]);

  useEffect(() => {
    if (!token) refreshToken();

    // commented out as access token refreshing is auto-handled by axios interceptor, look at Api class for details
    // const intervalId = setInterval(
    //   () => {
    //     refreshToken();
    //   },
    //   9 * 60 * 1000
    // );

    // return () => clearInterval(intervalId);
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
        setUserId(response.data.data.user_id);
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
    Cookies.remove('refresh-token');
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
        userId,
        token,
        refreshToken,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
