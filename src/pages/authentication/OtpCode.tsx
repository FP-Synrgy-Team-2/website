import { Form, Input } from '@/components';
import useAuth from '@/hooks/useAuth';
import usePassword from '@/hooks/usePassword';
import AuthLayout from '@/layouts/AuthLayout';
import { AxiosError } from 'axios';
import { useEffect, useState, useRef, KeyboardEvent, FocusEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

interface OtpCodeFormValues {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

type ErrorResponse = {
  code: number;
  message: string;
  status: boolean;
};

const OtpCode = () => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [timer, setTimer] = useState<number>(60);
  const methods = useForm<OtpCodeFormValues>();
  const { api } = useAuth();
  const { email, setOtp } = usePassword();
  const navigate = useNavigate();

  const focusRef = useRef<number>(1);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timer]);

  useEffect(() => {
    methods.setFocus('otp1');
    if (!email) {
      navigate('/forgot-password', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const handleOtpKeydown = (
    e: KeyboardEvent<HTMLInputElement>,
    fieldIndex: number
  ) => {
    const isNumbericKey = /^[0-9]$/.test(e.key);
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (!isNumbericKey && e.key !== 'Backspace') {
      e.preventDefault();
    }

    if (
      value.length === 1 &&
      fieldIndex < 6 &&
      isNumbericKey &&
      e.key !== 'Backspace'
    ) {
      focusRef.current = fieldIndex + 1;
      methods.setValue(`otp${fieldIndex}` as keyof OtpCodeFormValues, value);
      methods.setFocus(`otp${fieldIndex + 1}` as keyof OtpCodeFormValues);
    } else if (value.length === 1 && e.key === 'Backspace' && fieldIndex > 1) {
      focusRef.current = fieldIndex - 1;
      methods.setValue(`otp${fieldIndex}` as keyof OtpCodeFormValues, '');
      methods.setFocus(`otp${fieldIndex - 1}` as keyof OtpCodeFormValues);
      e.preventDefault();
    }
  };

  const handleOtpKeyup = () => {
    const allValues = methods.getValues();
    if (Object.values(allValues).every((val) => val !== '')) {
      methods.handleSubmit(onSubmit)();
      methods.setFocus('otp1');
      focusRef.current = 1;
      methods.reset();
    }
  };

  const handleOtpFocus = (
    e: FocusEvent<HTMLInputElement>,
    fieldIndex: number
  ) => {
    if (fieldIndex !== focusRef.current) {
      e.target.blur();
    }
  };

  const handleClick = async () => {
    try {
      const res = await api.post('/api/auth/password', {
        email_address: email,
      });
      if (res.status === 200) {
        focusRef.current = 1;
        methods.reset();
        methods.setFocus('otp1');
        setError(null);
        setTimer(60);
      }
    } catch (error) {
      setError({
        code: ((error as AxiosError).response?.data as ErrorResponse).code,
        message: ((error as AxiosError).response?.data as ErrorResponse)
          .message,
        status: ((error as AxiosError).response?.data as ErrorResponse).status,
      });
    }
  };

  const onSubmit: SubmitHandler<OtpCodeFormValues> = async (data) => {
    try {
      const res = await api.post('/api/auth/password/otp', {
        otp: Object.values(data).join(''),
      });
      if (res.status === 200) {
        setError(null);
        setOtp(Object.values(data).join(''));
        navigate('/forgot-password/reset');
      }
    } catch (error) {
      setError({
        code: ((error as AxiosError).response?.data as ErrorResponse).code,
        message: ((error as AxiosError).response?.data as ErrorResponse)
          .message,
        status: ((error as AxiosError).response?.data as ErrorResponse).status,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `0${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <AuthLayout>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="mx-24 w-full md:mx-8"
      >
        <div>
          <h1
            className="text-md-display font-bold"
            aria-label="Atur ulang password"
          >
            Atur ulang password
          </h1>
          <p
            className="text-lg-body font-regular opacity-40"
            aria-label="Langkah dua dari tiga"
          >
            Step 2/3
          </p>
          <p
            className="text-lg-body font-regular opacity-40"
            aria-label="Masukkan kode yang telah dikirimkan melalui email"
          >
            Masukkan kode yang telah dikirimkan melalui e-mail
          </p>
        </div>
        <div className="flex w-full justify-center text-primary-blue">
          {[...Array(6)].map((_, index) => (
            <Input
              className="input-otp w-10 text-center text-2xl-display focus:ring-0 focus-visible:ring-0 active:ring-0"
              type="text"
              key={index}
              inputMode="numeric"
              maxLength={1}
              onPaste={(e) => e.preventDefault()}
              onKeyDown={(e) => handleOtpKeydown(e, index + 1)}
              onFocus={(e) => handleOtpFocus(e, index + 1)}
              onKeyUp={handleOtpKeyup}
              id={`otp${index + 1}`}
              name={`otp${index + 1}`}
              placeholder="•"
            />
          ))}
        </div>
        <div className="flex w-full justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              handleClick();
            }}
            className="my-4 inline-block text-xl-body text-primary-dark-blue underline underline-offset-8 disabled:text-grey"
            disabled={timer !== 0}
          >
            Kirim ulang kode
          </button>
          <span className="my-4 inline-block text-xl-body text-primary-dark-blue">
            {formatTime(timer)}
          </span>
        </div>
        {error && (
          <span className="mt-4 inline-block w-full rounded-md border border-danger bg-danger bg-opacity-20 px-4 py-3 text-danger">
            {error.message}
          </span>
        )}
      </Form>
    </AuthLayout>
  );
};

export default OtpCode;
