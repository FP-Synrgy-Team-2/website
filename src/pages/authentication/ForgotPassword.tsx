import { ButtonPrimary, Form, Input, Label } from '@/components';
import useAuth from '@/hooks/useAuth';
import usePassword from '@/hooks/usePassword';
import AuthLayout from '@/layouts/AuthLayout';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordFormValues {
  email: string;
}

type ErrorResponse = {
  code: number;
  message: string;
  status: boolean;
};

const ForgotPassword = () => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const methods = useForm<ForgotPasswordFormValues>({ mode: 'onChange' });
  const { api } = useAuth();
  const { setEmail } = usePassword();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      const res = await api.post('/api/auth/password', {
        email_address: data.email,
      });
      if (res.status === 200) {
        setError(null);
        setEmail(data.email);
        navigate('/forgot-password/otp');
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

  const emailValidation = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Masukkan email yang valid';
  };

  return (
    <AuthLayout>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="mx-24 w-full md:mx-8"
      >
        <div>
          <div>
            <h1
              className="text-md-display font-bold"
              aria-label="Atur ulang password"
            >
              Atur ulang password
            </h1>
            <p
              className="text-lg-body font-regular opacity-40"
              aria-label="Langkah satu dari tiga"
            >
              Step 1/3
            </p>
            <p
              className="text-lg-body font-regular opacity-40"
              aria-label="Lengkapi data berikut untuk mengatur ulang password"
            >
              Lengkapi data berikut untuk mengatur ulang password
            </p>
          </div>
          <div>
            <div className="mt-10 flex w-full flex-col">
              <Label
                className="text-xl-body"
                aria-label="email"
                htmlFor="email"
              >
                E-mail
              </Label>
              <span
                className={`relative mt-4 flex h-[55px] w-full items-center rounded-[5px] border text-lg-body placeholder:text-lg-body ${methods.formState.errors.email?.message ? 'border-danger text-danger' : 'border-black text-black'}`}
              >
                <Input
                  id="email"
                  name="email"
                  className="h-full w-full border-none px-4 py-3"
                  validation={{
                    required: 'Masukkan email yang valid',
                    validate: emailValidation,
                  }}
                  placeholder="Masukkan email anda"
                />
              </span>
              {methods.formState.errors.email?.message && (
                <p className="mt-1 text-danger">
                  {methods.formState.errors.email?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {error && (
          <span className="mt-4 inline-block w-full rounded-md border border-danger bg-danger bg-opacity-20 px-4 py-3 text-danger">
            {error.message}
          </span>
        )}
        <ButtonPrimary className="mt-60 w-full rounded-[5px] p-3">
          Lanjut
        </ButtonPrimary>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
