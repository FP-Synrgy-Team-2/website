import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarLogo } from '../components';
import { useAuth } from '@/axios';
import axiosDefault, { AxiosError } from 'axios';

interface doLoginProps {
  username: string;
  password: string;
}
interface EyeSvgProps {
  inputType: string;
}

function EyeSvg({ inputType }: EyeSvgProps) {
  if (inputType === 'password')
    return (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5.5C6.55576 5.5 3.53109 9.73425 2.45554 11.6164C2.23488 12.0025 2.12456 12.1956 2.1367 12.4836C2.14885 12.7716 2.27857 12.9598 2.53799 13.3362C3.8182 15.1935 7.29389 19.5 12 19.5C16.7061 19.5 20.1818 15.1935 21.462 13.3362C21.7214 12.9598 21.8511 12.7716 21.8633 12.4836C21.8754 12.1956 21.7651 12.0025 21.5445 11.6164C20.4689 9.73425 17.4442 5.5 12 5.5Z"
          stroke="#33363F"
          strokeWidth="2"
        />
        <circle cx="12" cy="12.5" r="4" fill="#33363F" />
      </svg>
    );
  else if (inputType === 'text')
    return (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.8874 5.67157L6.8874 5.67157L5.17157 7.3874C4.59351 7.96546 4.30448 8.25449 4.15224 8.62203C4 8.98957 4 9.39832 4 10.2158V14.826C4 15.6517 4 16.0646 4.15505 16.4351C4.31011 16.8056 4.60419 17.0954 5.19235 17.675L6.89105 19.349C7.46745 19.9171 7.75566 20.2011 8.12024 20.3505C8.48482 20.5 8.88945 20.5 9.69871 20.5H14.3431C15.1606 20.5 15.5694 20.5 15.9369 20.3478C16.3045 20.1955 16.5935 19.9065 17.1716 19.3284L18.8284 17.6716C19.4065 17.0935 19.6955 16.8045 19.8478 16.4369C20 16.0694 20 15.6606 20 14.8431V10.1987C20 9.38945 20 8.98482 19.8505 8.62024C19.7011 8.25566 19.4171 7.96745 18.849 7.39105L17.175 5.69234C16.5954 5.10419 16.3056 4.81011 15.9351 4.65505C15.5646 4.5 15.1517 4.5 14.326 4.5H9.71582C8.89832 4.5 8.48957 4.5 8.12203 4.65224C7.75449 4.80448 7.46546 5.09351 6.8874 5.67157ZM8.44721 10.6056C7.95324 10.3586 7.35256 10.5588 7.10557 11.0528C6.85858 11.5468 7.05881 12.1474 7.55279 12.3944L7.85836 12.5472L7.60557 13.0528C7.35858 13.5468 7.55881 14.1474 8.05279 14.3944C8.54676 14.6414 9.14744 14.4412 9.39443 13.9472L9.73496 13.2661C10.1518 13.3745 10.5746 13.4525 11 13.5V14.5C11 15.0523 11.4477 15.5 12 15.5C12.5523 15.5 13 15.0523 13 14.5V13.5C13.4254 13.4525 13.8482 13.3745 14.265 13.2661L14.6056 13.9472C14.8526 14.4412 15.4532 14.6414 15.9472 14.3944C16.4412 14.1474 16.6414 13.5468 16.3944 13.0528L16.1416 12.5472L16.4472 12.3944C16.9412 12.1474 17.1414 11.5468 16.8944 11.0528C16.6474 10.5588 16.0468 10.3586 15.5528 10.6056L15.1305 10.8167C13.1598 11.8021 10.8402 11.8021 8.86951 10.8167L8.44721 10.6056Z"
          fill="#33363F"
        />
      </svg>
    );
}

interface LoginErrSpanProps {
  isShown: boolean;
  message: string;
}

function LoginErrSpan({ isShown, message }: LoginErrSpanProps) {
  if (isShown) {
    return (
      <span className="absolute -bottom-6 left-0 text-lg-body text-danger">
        {message}
      </span>
    );
  }
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logInIsError, setLogInIsError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string | null>(null);
  const [inputType, setInputType] = useState('password');
  const navigate = useNavigate();
  const session = sessionStorage.getItem('session');
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAuth();

  const defaultCssClass =
    'w-full h-[55px] px-10 border border-black border-opacity-40 rounded-[5px] placeholder:text-lg-body placeholder:text-black placeholder:text-opacity-40';
  const errorCssClass =
    'w-full h-[55px] px-10 border border-danger rounded-[5px] text-danger placeholder:text-lg-body placeholder:text-black placeholder:text-opacity-40;';

  const [inputCssClass, setInputCssClass] = useState(defaultCssClass);

  const checkSession = async () => {
    if (!session) throw 'No Session';

    const { userId } = JSON.parse(session);
    await axios.get(`/users/${userId}`);
    navigate('/dashboard', { replace: true });
  };

  useEffect(() => {
    if (logInIsError) setInputCssClass(errorCssClass);
    else setInputCssClass(defaultCssClass);

    checkSession().catch((err) => {
      setIsLoading(false);
      console.error(err);
    });
  }, [logInIsError]);

  async function doLogin({ username, password }: doLoginProps) {
    const URL = import.meta.env.VITE_API_URL;
    const res = await axiosDefault.post(
      URL + '/auth/login',
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { access_token, user_id, account_number } = res.data.data;

    sessionStorage.setItem(
      'session',
      JSON.stringify({
        accessToken: access_token,
        userId: user_id,
        accountNumber: account_number,
      })
    );
    navigate('/dashboard', { replace: true });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    doLogin({ username, password }).catch((err) => {
      console.log(err);
      setLogInIsError(true);
      if (err instanceof AxiosError && err.response!.status > 499)
        setLoginErrorMsg('Error terjadi, silahkan coba lagi!');
      else setLoginErrorMsg(null);
    });
  }

  const toggleShowPswd = () => {
    if (inputType === 'password') setInputType('text');
    else if (inputType === 'text') setInputType('password');
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      <div className="relative flex h-screen w-full justify-between">
        <NavbarLogo className="absolute left-[68px] top-[50px] flex flex-col items-end" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-y-10 pl-[133px]"
        >
          <div className="flex w-[348px] flex-col gap-y-5">
            <h1
              aria-label="Masuk ke akun anda"
              className="text-[36px] font-bold"
            >
              Masuk ke akun anda
            </h1>
            <span
              aria-label="Nikmati kemudahan mengelola keuangan Anda kapan saja"
              className="text-lg-body text-black text-opacity-40"
            >
              Nikmati kemudahan mengelola keuangan Anda kapan saja
            </span>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2.5">
              <label
                aria-label="Username"
                htmlFor="username"
                className="text-xl-body"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setLogInIsError(false);
                  }}
                  id="username"
                  placeholder="Masukkan username anda"
                  aria-label="text inputfield username"
                  className={inputCssClass}
                />
                <div className="absolute left-2.5 top-0 flex h-[55px] items-center">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.3746 16.671C16.8353 16.575 17.1097 16.0929 16.8808 15.6818C16.3761 14.7754 15.5811 13.9789 14.5641 13.3719C13.2542 12.5902 11.6494 12.1665 9.99835 12.1665C8.34734 12.1665 6.74247 12.5902 5.43264 13.3719C4.41561 13.9789 3.62059 14.7754 3.11594 15.6818C2.88703 16.0929 3.16139 16.575 3.62207 16.671C7.82774 17.5475 12.169 17.5475 16.3746 16.671Z"
                      fill="#0066AE"
                    />
                    <ellipse
                      cx="9.9987"
                      cy="7.16667"
                      rx="4.16667"
                      ry="4.16667"
                      fill="#0066AE"
                    />
                  </svg>
                </div>
                <LoginErrSpan
                  message={loginErrorMsg || 'Masukkan username yang benar'}
                  isShown={logInIsError}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <label
                htmlFor="password"
                aria-label="Password"
                className="text-xl-body"
              >
                Password
              </label>
              <div aria-label="text inputfield password" className="relative">
                <input
                  type={inputType}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLogInIsError(false);
                  }}
                  id="password"
                  placeholder="Masukkan password anda"
                  className={inputCssClass}
                />
                <div className="absolute left-2.5 top-0 flex h-[55px] items-center">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3346 7.16667V6.33333C13.3346 4.49239 11.8423 3 10.0013 3V3C8.16035 3 6.66797 4.49239 6.66797 6.33333V7.16667"
                      stroke="#0066AE"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.05332 7.59748C2.5 8.37731 2.5 9.48175 2.5 11.6906C2.5 14.6358 2.5 16.1084 3.23776 17.1482C3.49808 17.5151 3.81843 17.8354 4.18531 18.0957C5.22509 18.8335 6.69768 18.8335 9.64286 18.8335H10.3571C13.3023 18.8335 14.7749 18.8335 15.8147 18.0957C16.1816 17.8354 16.5019 17.5151 16.7622 17.1482C17.5 16.1084 17.5 14.6358 17.5 11.6906C17.5 9.48175 17.5 8.37731 16.9467 7.59748C16.7514 7.32232 16.5112 7.08205 16.236 6.88681C15.4562 6.3335 14.3517 6.3335 12.1429 6.3335H7.85714C5.64826 6.3335 4.54381 6.3335 3.76399 6.88681C3.48882 7.08205 3.24856 7.32232 3.05332 7.59748ZM10 12.6668C10.2761 12.6668 10.5 12.443 10.5 12.1668C10.5 11.8907 10.2761 11.6668 10 11.6668C9.72386 11.6668 9.5 11.8907 9.5 12.1668C9.5 12.443 9.72386 12.6668 10 12.6668ZM12.5 12.1668C12.5 13.192 11.883 14.073 11 14.4588V16.3335H9V14.4588C8.11705 14.073 7.5 13.192 7.5 12.1668C7.5 10.7861 8.61929 9.66683 10 9.66683C11.3807 9.66683 12.5 10.7861 12.5 12.1668Z"
                      fill="#0066AE"
                    />
                  </svg>
                </div>
                <div className="absolute right-2.5 top-0 z-10 flex h-[55px] items-center">
                  <button
                    type="button"
                    onClick={toggleShowPswd}
                    aria-label="tombol tampilkan password"
                  >
                    <EyeSvg inputType={inputType} />
                  </button>
                </div>
                <LoginErrSpan
                  message={loginErrorMsg || 'Masukkan password yang benar'}
                  isShown={logInIsError}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            aria-label="tombol masuk"
            className="z-10 flex h-[60px] items-center justify-center rounded-[5px] border border-black border-opacity-40 bg-primary-dark-blue text-xl-body font-bold text-primary-light-blue hover:border-primary-dark-blue hover:bg-primary-light-blue hover:text-primary-dark-blue hover:opacity-100"
          >
            Masuk
          </button>
        </form>
        <div aria-label="banner login" className="h-full w-auto">
          <img
            src="images/login/login_image.webp"
            alt=""
            className="h-full w-full"
          />
        </div>
        <img
          src="images/login/blue_object_blc.webp"
          alt=""
          className="absolute bottom-0 left-0"
        />
      </div>
    </>
  );
}

export default Login;
